import React from "react";
import "./Wrapper.scss";

export function Wrapper({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div className="wrapper" style={style}>
      {children}
    </div>
  );
}
