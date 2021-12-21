import dayjs from "dayjs";
import { addService } from ".";

export class DateService {
  format(date: Date | string) {
    return dayjs(date).format("YYYY-MM-DD");
  }
}

addService(DateService);
