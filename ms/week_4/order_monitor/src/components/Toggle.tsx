import * as React from "react";
import { Switch } from "antd";

interface ToggleProps {
  label: string;
  onOn?: () => void;
  onOff?: () => void;
}

export const Toggle: React.FC<ToggleProps> = props => {
  return (
    <Switch
      style={{
        marginLeft: 10
      }}
      checkedChildren={props.label}
      unCheckedChildren={props.label}
      onChange={checked => {
        if (checked) {
          props.onOn();
        } else {
          props.onOff();
        }
      }}
    />
  );
};
