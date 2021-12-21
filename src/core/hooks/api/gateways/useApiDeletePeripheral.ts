import { useCallback } from "react";
import { IPeripheral } from "../../../interfaces/peripheral.model";
import { getService } from "../../../services";
import { HttpService } from "../../../services/http.service";
import useAjaxState from "../../useAjaxState";
import { getAjaxEvents } from "../../useQueryState";

const httpService = getService<HttpService>(HttpService);

export const API_DELETE_PERIPHERAL_EVENT = "api_delete_peripheral";

export const apiDeletePeripheralEvents = getAjaxEvents(
  API_DELETE_PERIPHERAL_EVENT
);

export type ApiDeletePeripheralParams = Pick<IPeripheral, "id">;

export type ApiDeletePeripheralResponse = IPeripheral["id"] | undefined;

export default function useApiDeletePeripheral() {
  const { state, reset, handlePromise } =
    useAjaxState<ApiDeletePeripheralResponse>(API_DELETE_PERIPHERAL_EVENT);

  const sendRequest = useCallback(
    ({ id }: ApiDeletePeripheralParams) => {
      handlePromise(
        httpService.http.delete(
          httpService.buildPath(`/gateways/peripherals/${id}`)
        )
      );
    },
    [handlePromise]
  );
  return { sendRequest, state, reset };
}
