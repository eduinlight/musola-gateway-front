import { useCallback } from "react";
import { paths } from "../../routes";
import { useHistory } from "react-router";
import queryString from "query-string";
import { useTypedSelector } from "./use_typed_selector";
import { getService } from "../services";
import { BrowserService } from "../services/browser.service";

const browserService = getService<BrowserService>(BrowserService);

const useRoutes = () => {
  const navigator = useHistory();
  const { lang } = useTypedSelector((store) => store.app);

  const goBack = useCallback(() => {
    navigator.goBack();
  }, [navigator]);

  const goTo = useCallback(
    (
      path: string,
      params?: Record<string, string>,
      replace?: boolean,
      query?: Record<string, string>
    ) => {
      let newPath = path;
      for (const key of Object.keys(params || {})) {
        newPath = newPath.replace(
          new RegExp(":" + key, "g"),
          (params || {})[key]
        );
      }

      const queryStr = query ? `?${queryString.stringify(query)}` : "";
      newPath = browserService.generateLangPath(lang, `${newPath}${queryStr}`);

      if (replace) {
        navigator.replace(newPath);
      } else {
        navigator.push(newPath);
      }
    },
    [lang, navigator]
  );

  const createGoTo = <
    P extends Record<string, string>,
    Q extends Record<string, string> | undefined
  >(
    path: string
  ) => {
    return (params?: P, replace?: boolean, query?: Q) => {
      goTo(path, params, replace, query);
    };
  };

  return {
    goToHome: createGoTo(paths.HOME),
    goToEditGateway: createGoTo<{ id: string }, undefined>(paths.EDIT_GATEWAY),
    goToAddGateway: createGoTo(paths.ADD_GATEWAY),
    goToAddPeripheral: createGoTo<{ gatewayId: string }, undefined>(
      paths.ADD_PERIPHERAL
    ),
    goToEditPeripheral: createGoTo<
      { gatewayId: string; id: string },
      undefined
    >(paths.EDIT_PERIPHERAL),
    goToDetailsGateway: createGoTo<{ id: string }, undefined>(
      paths.DETAILS_GATEWAY
    ),
    goBack,
    goTo
  };
};

export default useRoutes;
