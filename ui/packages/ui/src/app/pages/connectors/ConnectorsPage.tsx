import { Connector } from "@debezium/ui-models";
import {
  Bullseye,
  Button,
  DataList,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Flex,
  FlexItem,
  PageSection,
  Title,
} from "@patternfly/react-core";
import { CubesIcon } from "@patternfly/react-icons";
import React from "react";
import { Link } from "react-router-dom";
import { ConnectorTypeId } from "src/app/shared";
import { ConnectorListItem } from "./ConnectorListItem";
import "./ConnectorsPage.css";

/**
 * Sorts the connectors by name.
 * @param connectors
 */
function getSortedConnectors(connectors: Connector[]) {
  const sortedConns: Connector[] = connectors
    .sort((thisConn, thatConn) => {
      return thisConn.name.localeCompare(thatConn.name);
    });

  return sortedConns;
}

export const ConnectorsPage: React.FunctionComponent = () => {
  // TODO: Replace this fake data with results from rest service call, when available.
  const [connectors, setConnectors] = React.useState<Connector[]>(
    [
      {
        name: "mongoTest",
        description: "MongoDB connector",
        type: ConnectorTypeId.MONGO
      } as Connector,
      {
        name: "postgresTest",
        description: "PostgreSQL connector",
        type: ConnectorTypeId.POSTGRES
      } as Connector,
      {
        name: "mySqlTest",
        description: "MySQL connector",
        type: ConnectorTypeId.MYSQL
      } as Connector,
      {
        name: "sqlServerTest",
        description: "SqlServer connector",
        type: ConnectorTypeId.SQLSERVER
      } as Connector
    ] as Connector[]
  );
  
  return (
    <>
      <Flex className="connectors-page_toolbarFlex">
        <FlexItem>
          <Title headingLevel={"h1"}>Connectors</Title>
        </FlexItem>
        <FlexItem>
          <Link to="/app/create-connector">
            <Button variant="primary" className="connectors-page_toolbarCreateButton">
              Create a connector
            </Button>
          </Link>
        </FlexItem>
      </Flex>
      {connectors.length > 0 ? (
        <DataList aria-label={"connector list"}>
          {getSortedConnectors(connectors).map((conn, index) => {
            return (
              <ConnectorListItem
                key={index}
                connectorName={conn.name}
                connectorType={conn.type}
                connectorDescription={conn.description}
              />
            );
          })}
        </DataList>
      ) : (
        <Bullseye>
          <EmptyState variant={EmptyStateVariant.large}>
            <EmptyStateIcon icon={CubesIcon} />
            <Title headingLevel="h4" size="lg">
              Start from configuring a connector
            </Title>
            <EmptyStateBody>
              There are no connectors. Please click 'Configure a connector' to
              create a new connector.
            </EmptyStateBody>
            <Link to="/create-connector">
              <Button
                variant="primary"
                className="connectors-page_createButton"
              >
                Create a connector
              </Button>
            </Link>
          </EmptyState>
        </Bullseye>
      )}
    </>
  );
};
