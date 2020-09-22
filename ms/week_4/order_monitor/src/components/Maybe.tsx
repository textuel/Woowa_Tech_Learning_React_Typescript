import * as React from "react";

interface IMaybeProps {
  test: boolean;
  children: React.ReactNode;
}

export const Maybe: React.FC<IMaybeProps> = ({ test, children }) => (
  <React.Fragment>{test ? children : null}</React.Fragment>
);
