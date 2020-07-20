import React from "react";
import SwitchPanel from "./SwitchPanel";
import {
  Provider as UrqlProvider,
  createClient,
  Subscription,
  defaultExchanges,
  subscriptionExchange
} from "urql";
import { SubscriptionClient } from "subscriptions-transport-ws";
import Subscriber from "./Subscriber";
import LineChart from "./LineChart"

const subscriptionClient = new SubscriptionClient(
  "wss://react.eogresources.com/graphql",
  {
    reconnect: true,
    timeout: 20000
  }
);

const client = createClient({
  
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation)
    })
  ]
});

const newMessages = `
subscription {
  newMeasurement {metric, at, value, unit}
}
`;

export default () => (
  <UrqlProvider value={client}>
    if (condition) {
      
    }else{
      <Subscription query={newMessages}>
      {({ data }) => <Subscriber data={data} />}
    </Subscription>
    }   
    <SwitchPanel />
    <LineChart />
  </UrqlProvider>
);
