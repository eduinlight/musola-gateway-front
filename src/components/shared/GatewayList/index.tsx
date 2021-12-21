import React, { FunctionComponent } from "react";
import { Box, Divider, List, ListItem } from "@material-ui/core";
import { IGateway } from "../../../core/interfaces/gateway.model";
import GatewayListItem, { GatewayListItemProps } from "../GatewayListItem";

export interface GatewayListProps {
  gateways: IGateway[];
  onRemove: GatewayListItemProps["onRemove"];
  onEdit: GatewayListItemProps["onEdit"];
  onClick: (gateway: IGateway) => void;
}

const GatewayList: FunctionComponent<GatewayListProps> = ({
  gateways,
  onRemove,
  onEdit,
  onClick
}: GatewayListProps) => {
  return (
    <List>
      {gateways.map((gateway, index) => (
        <React.Fragment key={gateway.id}>
          <ListItem button onClick={() => onClick(gateway)}>
            <GatewayListItem
              gateway={gateway}
              onRemove={onRemove}
              onEdit={onEdit}
            />
          </ListItem>
          {index < gateways.length - 1 && (
            <Box my={1} width="100%">
              <Divider light />
            </Box>
          )}
        </React.Fragment>
      ))}
    </List>
  );
};

export default GatewayList;
