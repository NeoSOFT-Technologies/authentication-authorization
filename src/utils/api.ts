import axios from "axios";

// const defaultBaseUrl =
//   process.env.REACT_APP_API_BASEURL || "http://localhost:3000";
const defaultBackendUrl =
  process.env.REACT_APP_API_Backend || "localhost:44369/api/v1/";
class ApiFactoryWrapper {
  private baseURL;
  constructor(URL: string = defaultBackendUrl) {
    this.baseURL = URL;
  }

  transformResponse = (input: string) => {
    try {
      return JSON.parse(input);
    } catch {
      /* Ignore */
    }
  };

  buildHeader = (obj = {}) => {
    const header = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    Object.assign(header, obj);
    return header;
  };

  apiFactory = (header = {}) => {
    return axios.create({
      baseURL: this.baseURL,
      headers: this.buildHeader(header),
      transformResponse: [
        (data) => {
          if (typeof data === "string") {
            return this.transformResponse(data);
          }
          return data;
        },
      ],
    });
  };
}

const apiFactory = new ApiFactoryWrapper().apiFactory;
export default apiFactory;
