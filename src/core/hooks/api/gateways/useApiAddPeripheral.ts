import { useCallback } from "react";
import { IPeripheral } from "../../../interfaces/peripheral.model";
import { getService } from "../../../services";
import { HttpService } from "../../../services/http.service";
import useAjaxState from "../../useAjaxState";
import { getAjaxEvents } from "../../useQueryState";

const httpService = getService<HttpService>(HttpService);

export const API_ADD_PERIPHERAL_EVENT = "api_add_peripheral";

export const apiAddPeripheralEvents = getAjaxEvents(API_ADD_PERIPHERAL_EVENT);

export type ApiAddPeripheralParams = Pick<
  IPeripheral,
  "uid" | "vendor" | "dateCreated" | "status" | "gateway"
>;

export type ApiAddPeripheralResponse = IPeripheral;

export default function useApiAddPeripheral() {
  const { state, reset, handlePromise } =
    useAjaxState<ApiAddPeripheralResponse>(API_ADD_PERIPHERAL_EVENT);

  const sendRequest = useCallback(
    ({ gateway, ...data }: ApiAddPeripheralParams) => {
      handlePromise(
        httpService.http.post(
          httpService.buildPath(`/gateways/peripherals/${gateway}`),
          data
        )
      );
    },
    [handlePromise]
  );
  return { sendRequest, state, reset };
}
