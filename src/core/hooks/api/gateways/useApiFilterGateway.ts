import { useCallback } from "react";
import { IGateway } from "../../../interfaces/gateway.model";
import { getService } from "../../../services";
import { HttpService } from "../../../services/http.service";
import useAjaxState from "../../useAjaxState";
import { getAjaxEvents } from "../../useQueryState";

const httpService = getService<HttpService>(HttpService);

export const API_FILTER_GATEWAY_EVENT = "api_filter_gateway";

export const apiFilterGatewayEvents = getAjaxEvents(API_FILTER_GATEWAY_EVENT);

export type ApiFilterGatewayParams = {
  limit: number;
  skip: number;
};

export type ApiFilterGatewayResponse = IGateway[];

export default function useApiFilterGateway() {
  const { state, reset, handlePromise } =
    useAjaxState<ApiFilterGatewayResponse>(API_FILTER_GATEWAY_EVENT);

  const sendRequest = useCallback(
    ({ ...query }: ApiFilterGatewayParams) => {
      handlePromise(
        httpService.http.get(httpService.buildPath(`/gateways`, query))
      );
    },
    [handlePromise]
  );
  return { sendRequest, state, reset };
}
