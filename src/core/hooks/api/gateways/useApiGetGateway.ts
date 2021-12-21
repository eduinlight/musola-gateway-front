import { useCallback } from "react";
import { IGateway } from "../../../interfaces/gateway.model";
import { getService } from "../../../services";
import { HttpService } from "../../../services/http.service";
import useAjaxState from "../../useAjaxState";
import { getAjaxEvents } from "../../useQueryState";

const httpService = getService<HttpService>(HttpService);

export const API_GET_GATEWAY_EVENT = "api_get_gateway";

export const apiGetGatewayEvents = getAjaxEvents(API_GET_GATEWAY_EVENT);

export type ApiGetGatewayParams = Pick<IGateway, "id">;

export type ApiGetGatewayResponse = IGateway;

export default function useApiGetGateway() {
  const { state, reset, handlePromise } = useAjaxState<ApiGetGatewayResponse>(
    API_GET_GATEWAY_EVENT
  );

  const sendRequest = useCallback(
    ({ id }: ApiGetGatewayParams) => {
      handlePromise(
        httpService.http.get(httpService.buildPath(`/gateways/${id}`))
      );
    },
    [handlePromise]
  );
  return { sendRequest, state, reset };
}
