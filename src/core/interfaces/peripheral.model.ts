import { IGateway } from "./gateway.model";
import IModel from "./imodel";

export enum EPeripheralStatus {
  ONLINE = "online",
  OFFLINE = "offline"
}

export interface IPeripheral extends IModel {
  uid: number;
  vendor: string;
  dateCreated: Date;
  status: EPeripheralStatus;
  gateway: IGateway["id"];
}
