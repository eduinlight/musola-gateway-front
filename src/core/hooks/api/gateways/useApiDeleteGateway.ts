import { useCallback } from "react";
import { IGateway } from "../../../interfaces/gateway.model";
import { getService } from "../../../services";
import { HttpService } from "../../../services/http.service";
import useAjaxState from "../../useAjaxState";
import { getAjaxEvents } from "../../useQueryState";

const httpService = getService<HttpService>(HttpService);

export const API_DELETE_GATEWAY_EVENT = "api_delete_gateway";

export const apiDeleteGatewayEvents = getAjaxEvents(API_DELETE_GATEWAY_EVENT);

export type ApiDeleteGatewayParams = Pick<IGateway, "id">;

export type ApiDeleteGatewayResponse = IGateway["id"] | undefined;

export default function useApiDeleteGateway() {
  const { state, reset, handlePromise } =
    useAjaxState<ApiDeleteGatewayResponse>(API_DELETE_GATEWAY_EVENT);

  const sendRequest = useCallback(
    ({ id }: ApiDeleteGatewayParams) => {
      handlePromise(
        httpService.http.delete(httpService.buildPath(`/gateways/${id}`))
      );
    },
    [handlePromise]
  );
  return { sendRequest, state, reset };
}
