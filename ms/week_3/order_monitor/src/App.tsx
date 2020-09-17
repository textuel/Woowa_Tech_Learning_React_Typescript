import * as React from "react";
import { OrderStatusContiner, MonitorControllerContainer } from "./containers";
import { Typography } from "antd";

import "antd/dist/antd.css";
import "./sass/main.scss";

export default class App extends React.PureComponent {
  render() {
    return (
      <div>
        <header>
          <Typography.Title>React & TS Boilerplate</Typography.Title>
        </header>
        <main>
          <OrderStatusContiner />
          <MonitorControllerContainer />
        </main>
      </div>
    );
  }
}
