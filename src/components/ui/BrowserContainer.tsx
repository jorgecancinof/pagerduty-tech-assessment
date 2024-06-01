import React from "react";

interface BrowserContainerProps {
  children: React.ReactNode;
}

function BrowserContainer({ children }: BrowserContainerProps) {
  return <div className="browser-container">{children}</div>;
}

export default BrowserContainer;
