import axios, { AxiosInstance } from "axios";
import queryString from "query-string";
import { addService, getService } from ".";
import { ConfigService } from "./config.service";

const configService = getService<ConfigService>(ConfigService);

export class HttpService {
  http: AxiosInstance;

  constructor() {
    this.http = axios;
    this.http.defaults.headers["Content-Type"] = "application/json";
  }

  setRequestToken(token: string) {
    this.http.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  removeRequestToken() {
    delete this.http.defaults.headers["Authorization"];
  }

  buildPath(path: string, query?: Record<string, any>) {
    const queryStr = query ? `?${queryString.stringify(query)}` : "";
    return `${configService.apiUrl}${path}${queryStr}`;
  }
}

addService(HttpService);
