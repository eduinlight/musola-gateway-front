import EventEmitter from "events";
import { addService } from ".";

export class EmitterService extends EventEmitter {
  constructor() {
    super();
  }
}

addService(EmitterService);
