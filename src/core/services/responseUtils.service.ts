import { addService } from ".";
import { EPeripheralStatus } from "../interfaces/peripheral.model";
import { translate } from "../translate";

export class ResponseUtilsService {
  classValidatorErrorToRecord(errors: string[]) {
    return errors.reduce((acc, curr) => {
      const splitted = curr.split(" ");
      return { ...acc, [splitted[0]]: splitted.slice(1).join(" ") };
    }, {});
  }

  peripheralStatusToStr(status: EPeripheralStatus) {
    return translate(
      status === EPeripheralStatus.ONLINE ? "online" : "offline"
    );
  }
}

addService(ResponseUtilsService);
