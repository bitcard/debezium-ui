import {
  Split,
  SplitItem,
  Text,
  TextContent,
  TextVariants,
} from "@patternfly/react-core";
import React from "react";
import {
  ConnectorTypeId,
} from "src/app/shared";
import { ConnectorIcon } from '../../connectors/ConnectorIcon';
import "./ConnectorTypeComponent.css";

export interface IConnectorTypeComponentProps {
  connectorType?: string;
}

export const ConnectorTypeComponent: React.FunctionComponent<IConnectorTypeComponentProps> = (
  props
) => {

  const displayName = () => {
    if( props.connectorType === ConnectorTypeId.MONGO ) {
      return "MongoDB";
    } else if ( props.connectorType === ConnectorTypeId.POSTGRES ) {
      return "PostgreSQL";
    } else if ( props.connectorType === ConnectorTypeId.MYSQL ) {
      return "MySQL";
    } else if ( props.connectorType === ConnectorTypeId.SQLSERVER ) {
      return "SQL Server";
    }
    return "Unknown";
  }

  return (
    <Split>
      {props.connectorType ? (
        <SplitItem className="connector-type-icon">
          <ConnectorIcon
            connectorType={props.connectorType}
            alt={props.connectorType}
            width={30}
            height={30}
          />
        </SplitItem>
      ) : null}
      <SplitItem>
        <TextContent>
          <Text component={TextVariants.p}>{displayName()}</Text>
        </TextContent>
      </SplitItem>
    </Split>
  );
};