import axios from "axios";
function getLocalAccessToken() {
  let user: any =
    localStorage.getItem(
      "oidc.user:https://login.microsoftonline.com/1e3bab2c-ff49-4d6c-827a-5017e6fd859c:93220d6d-a71a-4e6f-9919-49ab354c35a0"
    ) || undefined;
  if (user) {
    user = JSON.parse(user);
  }
  return user?.id_token;
}

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
    const id_token = getLocalAccessToken();

    const header = {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Authorization: `Bearer ${"CfDJ8PqqaOPRD5NMjsxSN-p02Z64p68PYvkUS9PZIxvFXeeLc63hGue82_Wrhtnb9dypNtfRCa__dfkLcdIcd0HxyeLKjNdhl7yqv2CEs2MFwUV_9-ol3-vXJYHxRhmi4lhelomEuJtt5fv2IpwjPvCGn3f95M6TfIkLRxiIdeTIBf5f"}`,
      Authorization: `Bearer ${id_token}`,
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
