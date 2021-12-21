import { useEffect } from "react";
import { getService } from "../services";
import { EmitterService } from "../services/emitter.service";

export interface EmitterEvent {
  event: string;
  handler: any;
}

const emitterService = getService<EmitterService>(EmitterService);

export default function useEmitterEvents(events: EmitterEvent[]) {
  useEffect(() => {
    for (const { event, handler } of events) {
      emitterService.on(event, handler);
    }
    return () => {
      for (const { event, handler } of events) {
        emitterService.off(event, handler);
      }
    };
  }, [events]);
}
