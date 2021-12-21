import { AxiosResponse } from "axios";
import { useCallback } from "react";
import useQueryState from "./useQueryState";

export default function useAjaxState<ResponseType>(event: string) {
  const { state, setError, setSuccess, setLoading, reset } =
    useQueryState<ResponseType>(event);

  const handlePromise = useCallback(
    (promise: Promise<any>) => {
      setLoading();
      promise
        .then(({ data }: AxiosResponse) => {
          setSuccess(data);
        })
        .catch((e) => {
          setError(e);
        });
    },
    [setError, setLoading, setSuccess]
  );

  return { handlePromise, state, reset };
}
