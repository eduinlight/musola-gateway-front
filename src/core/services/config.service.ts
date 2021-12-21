import { addService } from ".";

export class ConfigService {
  apiUrl = process.env.API_URL;
  notifications = {
    autoHideDuration: 3000,
    transitionDuration: {
      enter: 500,
      exit: 500
    }
  };
}

addService(ConfigService);
