import * as React from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { ITimelineItem } from "../types";

interface IPros {
  source: ITimelineItem[];
}

export const TinyChart: React.FC<IPros> = props => (
  <ResponsiveContainer width="100%" height={50}>
    <AreaChart
      margin={{ top: 20, right: 20, left: 20, bottom: 0 }}
      data={props.source}
    >
      <Area type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
    </AreaChart>
  </ResponsiveContainer>
);
