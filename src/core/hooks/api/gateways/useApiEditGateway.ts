import { useCallback } from "react";
import { IGateway } from "../../../interfaces/gateway.model";
import { getService } from "../../../services";
import { HttpService } from "../../../services/http.service";
import useAjaxState from "../../useAjaxState";
import { getAjaxEvents } from "../../useQueryState";
import { ApiAddGatewayParams } from "./useApiAddGateway";

const httpService = getService<HttpService>(HttpService);

export const API_EDIT_GATEWAY_EVENT = "api_edit_gateway";

export const apiEditGatewayEvents = getAjaxEvents(API_EDIT_GATEWAY_EVENT);

export type ApiEditGatewayParams = Partial<ApiAddGatewayParams> &
  Pick<IGateway, "id">;

export type ApiEditGatewayResponse = IGateway;

export default function useApiEditGateway() {
  const { state, reset, handlePromise } = useAjaxState<ApiEditGatewayResponse>(
    API_EDIT_GATEWAY_EVENT
  );

  const sendRequest = useCallback(
    ({ id, ...data }: ApiEditGatewayParams) => {
      handlePromise(
        httpService.http.put(httpService.buildPath(`/gateways/${id}`), data)
      );
    },
    [handlePromise]
  );
  return { sendRequest, state, reset };
}
