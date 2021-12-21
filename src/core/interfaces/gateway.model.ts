import IModel from "./imodel";
import { IPeripheral } from "./peripheral.model";

export interface IGateway extends IModel {
  serial: string;
  name: string;
  ipv4: string;
  peripherals: IPeripheral[];
}
