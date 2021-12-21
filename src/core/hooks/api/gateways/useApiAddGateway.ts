import { useCallback } from "react";
import { IGateway } from "../../../interfaces/gateway.model";
import { getService } from "../../../services";
import { HttpService } from "../../../services/http.service";
import useAjaxState from "../../useAjaxState";
import { getAjaxEvents } from "../../useQueryState";

const httpService = getService<HttpService>(HttpService);

export const API_ADD_GATEWAY_EVENT = "api_add_gateway";

export const apiAddGatewayEvents = getAjaxEvents(API_ADD_GATEWAY_EVENT);

export type ApiAddGatewayParams = Pick<IGateway, "serial" | "name" | "ipv4">;

export type ApiAddGatewayResponse = IGateway;

export default function useApiAddGateway() {
  const { state, reset, handlePromise } = useAjaxState<ApiAddGatewayResponse>(
    API_ADD_GATEWAY_EVENT
  );

  const sendRequest = useCallback(
    (data: ApiAddGatewayParams) => {
      handlePromise(
        httpService.http.post(httpService.buildPath("/gateways"), data)
      );
    },
    [handlePromise]
  );
  return { sendRequest, state, reset };
}
