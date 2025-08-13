import React from "react";
import "./Wrapper.scss";

export function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="wrapper">{children}</div>;
}
