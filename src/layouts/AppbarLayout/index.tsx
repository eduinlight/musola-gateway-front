import React, { FC, ReactNode } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Container, Toolbar, Box } from "@material-ui/core";
import { translate } from "../../core/translate";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: `calc(100vh - 68px)`,
    display: "flex",
    justifyContent: "flex-start",
    padding: theme.spacing(3)
  }
}));

export interface AppBarLayoutProps {
  children: any;
  renderBreadcrum?: ReactNode;
}

const AppbarLayout: FC<AppBarLayoutProps> = (props: AppBarLayoutProps) => {
  const { children, renderBreadcrum } = props;
  const styles = useStyles();

  return (
    <>
      <AppBar variant="outlined" position="static" color="transparent">
        <Toolbar>
          <Box>{translate("title")}</Box>
          <Box ml={4}>{renderBreadcrum}</Box>
        </Toolbar>
      </AppBar>
      <Container className={styles.container}>{children}</Container>
    </>
  );
};

export default AppbarLayout;
