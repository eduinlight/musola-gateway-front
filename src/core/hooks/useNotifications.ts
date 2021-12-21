import { useSnackbar } from "notistack";
import { useCallback } from "react";

export default function useNotifications() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const success = useCallback(
    (message: string) => {
      enqueueSnackbar(message, {
        variant: "success"
      });
    },
    [enqueueSnackbar]
  );

  const warning = useCallback(
    (message: string) => {
      enqueueSnackbar(message, {
        variant: "warning"
      });
    },
    [enqueueSnackbar]
  );

  const info = useCallback(
    (message: string) => {
      enqueueSnackbar(message, { variant: "info" });
    },
    [enqueueSnackbar]
  );

  const error = useCallback(
    (message: string) => {
      enqueueSnackbar(message, { variant: "error" });
    },
    [enqueueSnackbar]
  );

  const noti = useCallback(
    (message: string) => {
      enqueueSnackbar(message, {
        variant: "default"
      });
    },
    [enqueueSnackbar]
  );

  const close = useCallback(
    (snackbar: string | number | undefined) => {
      closeSnackbar(snackbar);
    },
    [closeSnackbar]
  );

  return { success, warning, info, error, close, noti };
}
