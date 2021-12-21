import React, { FunctionComponent, ReactNode } from "react";
import { Redirect, Route, Switch } from "react-router";
import { useTypedSelector } from "../../../core/hooks/use_typed_selector";
import { getService } from "../../../core/services";
import { BrowserService } from "../../../core/services/browser.service";
import { paths } from "../../../routes";
// guards
import RouteWrapper from "./RouteWrapper";

const browserService = getService<BrowserService>(BrowserService);

export interface RouteType {
  path: string;
  exact: boolean;
  component: ReactNode;
  guards: Array<() => boolean>;
  guardsNotPassRedirect?: string;
}

export interface RoutersProps {
  routes: RouteType[];
}

const Routes: FunctionComponent<RoutersProps> = (props: RoutersProps) => {
  const { routes } = props;
  const { lang } = useTypedSelector((store) => store.app);

  return (
    <Switch>
      {routes.map((route) => {
        return (
          <Route
            key={route.path}
            path={browserService.generateLangPath(lang, route.path)}
            exact={route.exact}
            render={(props: any) => <RouteWrapper route={route} {...props} />}
          />
        );
      })}
      <Redirect
        to={browserService.generateLangPath(lang, paths.HOME)}
        exact={true}
      />
    </Switch>
  );
};

export default Routes;
