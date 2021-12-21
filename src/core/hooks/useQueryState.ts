import { AxiosError } from "axios";
import { useCallback, useMemo } from "react";
import { getService } from "../services";
import { EmitterService } from "../services/emitter.service";
import useImmerState from "./useImmerState";

const emitterService = getService<EmitterService>(EmitterService);

export interface QueryState<T> {
  loading: boolean;
  success: boolean;
  data: null | T;
  error: null | AxiosError;
}

export function getSuccessEvent(event: string) {
  return `${event}_success`;
}

export function getLoadingEvent(event: string) {
  return `${event}_loading`;
}

export function getErrorEvent(event: string) {
  return `${event}_error`;
}

export function getAjaxEvents(event: string) {
  return {
    success: getSuccessEvent(event),
    error: getErrorEvent(event),
    loading: getLoadingEvent(event)
  };
}

const useQueryState = <T>(event: string) => {
  const initialValue = useMemo(
    () => ({
      loading: false,
      success: false,
      error: null,
      data: null
    }),
    []
  );

  const [state, setState] = useImmerState<QueryState<T>>(initialValue);

  const setLoading = useCallback(() => {
    setState((newState) => {
      newState.loading = true;
      newState.error = null;
      newState.success = false;
    });
    emitterService.emit(getLoadingEvent(event));
  }, [event, setState]);

  const setError = useCallback(
    (data: any) => {
      setState((newState) => {
        newState.loading = false;
        newState.error = data;
        newState.data = null;
      });
      emitterService.emit(getErrorEvent(event), data);
    },
    [event, setState]
  );

  const setSuccess = useCallback(
    (data: T) => {
      setState((newState) => {
        newState.loading = false;
        newState.success = true;
        newState.data = data;
      });
      emitterService.emit(getSuccessEvent(event), data);
    },
    [event, setState]
  );

  const reset = useCallback(() => {
    setState((newState) => {
      Object.assign(newState, initialValue);
    });
  }, [initialValue, setState]);

  return {
    state,
    setError,
    setSuccess,
    setLoading,
    reset
  };
};

export default useQueryState;
