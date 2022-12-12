﻿using AutoMapper;
using BoilerPlate.Application.Contracts.Infrastructure;
using BoilerPlate.Application.Contracts.Persistence;
using BoilerPlate.Application.Models.Mail;
using BoilerPlate.Application.Responses;
using BoilerPlate.Domain.Entities;
using MediatR;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace BoilerPlate.Application.Features.Events.Commands.CreateEvent
{
    public class CreateEventCommandHandler : IRequestHandler<CreateEventCommand, Response<Guid>>
    {
        private readonly IEventRepository _eventRepository;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;
        private readonly ILogger<CreateEventCommandHandler> _logger;
        private readonly IMessageRepository _messageRepository;

        public CreateEventCommandHandler(IMapper mapper, IEventRepository eventRepository, IEmailService emailService, ILogger<CreateEventCommandHandler> logger, IMessageRepository messageRepository)
        {
            _mapper = mapper;
            _eventRepository = eventRepository;
            _emailService = emailService;
            _logger = logger;
            _messageRepository = messageRepository;
        }

        public async Task<Response<Guid>> Handle(CreateEventCommand request, CancellationToken cancellationToken)
        {
            _logger.LogInformation("Handle Initiated");

            var validator = new CreateEventCommandValidator(_eventRepository, _messageRepository);
            var validationResult = await validator.ValidateAsync(request);
            
            if (validationResult.Errors.Count > 0)
                throw new Exceptions.ValidationException(validationResult);

            var @event = _mapper.Map<Event>(request);

            @event = await _eventRepository.AddAsync(@event);

            //Sending email notification to admin address
            var email = new Email() { To = "gill@snowball.be", Body = $"A new event was created: {request}", Subject = "A new event was created" };

            try
            {
                await _emailService.SendEmail(email);
            }
            catch (Exception ex)
            {
                //this shouldn't stop the API from doing else so this can be logged
                _logger.LogError($"Mailing about event {@event.EventId} failed due to an error with the mail service: {ex.Message}");
            }

            var response = new Response<Guid>(@event.EventId , "Inserted successfully ");

            _logger.LogInformation("Handle Completed");

            return response;
        }
    }
}