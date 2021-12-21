import React, { FunctionComponent } from "react";
import { Box, Typography } from "@material-ui/core";
import { IGateway } from "../../../core/interfaces/gateway.model";
import { translate } from "../../../core/translate";

export interface GatewayCardProps {
  gateway: IGateway;
}

const GatewayCard: FunctionComponent<GatewayCardProps> = ({
  gateway
}: GatewayCardProps) => {
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
    >
      <Box display="flex" flexDirection="column">
        <Typography>
          <b>{translate("serial")}:</b> {gateway.serial}
        </Typography>
        <Typography>
          <b>{translate("name")}:</b> {gateway.name}
        </Typography>
        <Typography>
          <b>{translate("ipv4")}:</b> {gateway.ipv4}
        </Typography>
        <Typography>
          <b>{translate("peripherals")}:</b> {gateway.peripherals.length}
        </Typography>
      </Box>
    </Box>
  );
};

export default GatewayCard;
