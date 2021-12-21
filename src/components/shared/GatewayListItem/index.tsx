import React, { FunctionComponent, useCallback } from "react";
import { Box, Typography } from "@material-ui/core";
import RemoveButton from "../RemoveButton";
import { IGateway } from "../../../core/interfaces/gateway.model";
import { translate } from "../../../core/translate";
import EditButton from "../EditButton";

export interface GatewayListItemProps {
  gateway: IGateway;
  onRemove: (id: IGateway["id"]) => void;
  onEdit: (gateway: IGateway) => void;
}

const GatewayListItem: FunctionComponent<GatewayListItemProps> = ({
  gateway,
  onRemove,
  onEdit
}: GatewayListItemProps) => {
  const handleRemove = useCallback(
    (event: any) => {
      event.stopPropagation();
      if (onRemove) {
        onRemove(gateway.id);
      }
    },
    [gateway.id, onRemove]
  );

  const handleEdit = useCallback(
    (event: any) => {
      event.stopPropagation();
      if (onEdit) {
        onEdit(gateway);
      }
    },
    [gateway, onEdit]
  );

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
      <Box display="flex" flexDirection="row" alignItems="flex-start">
        <RemoveButton
          onClick={handleRemove}
          title={translate("removeGateway")}
        />
        <EditButton onClick={handleEdit} title={translate("editGateway")} />
      </Box>
    </Box>
  );
};

export default GatewayListItem;
