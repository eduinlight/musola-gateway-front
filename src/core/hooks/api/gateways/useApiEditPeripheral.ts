import { useCallback } from "react";
import { IPeripheral } from "../../../interfaces/peripheral.model";
import { getService } from "../../../services";
import { HttpService } from "../../../services/http.service";
import useAjaxState from "../../useAjaxState";
import { getAjaxEvents } from "../../useQueryState";

const httpService = getService<HttpService>(HttpService);

export const API_EDIT_PERIPHERAL_EVENT = "api_edit_peripheral";

export const apiEditPeripheralEvents = getAjaxEvents(API_EDIT_PERIPHERAL_EVENT);

export type ApiEditPeripheralParams = Partial<
  Pick<IPeripheral, "uid" | "vendor" | "dateCreated" | "status">
> &
  Pick<IPeripheral, "id">;

export type ApiEditPeripheralResponse = IPeripheral;

export default function useApiEditPeripheral() {
  const { state, reset, handlePromise } =
    useAjaxState<ApiEditPeripheralResponse>(API_EDIT_PERIPHERAL_EVENT);

  const sendRequest = useCallback(
    ({ id, ...data }: ApiEditPeripheralParams) => {
      handlePromise(
        httpService.http.put(
          httpService.buildPath(`/gateways/peripherals/${id}`),
          data
        )
      );
    },
    [handlePromise]
  );
  return { sendRequest, state, reset };
}
