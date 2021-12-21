import React, { FunctionComponent } from "react";
import { Box, Button, ButtonProps } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import { translate } from "../../../core/translate";

export type AddButtonProps = ButtonProps;

const AddButton: FunctionComponent<AddButtonProps> = (
  props: AddButtonProps
) => {
  return (
    <Button {...props}>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Box mr={2}>{translate("add")}</Box>
        <AddCircle />
      </Box>
    </Button>
  );
};

export default AddButton;
