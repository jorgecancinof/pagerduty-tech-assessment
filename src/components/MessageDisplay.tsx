import React from "react";

interface Props {
  children: React.ReactNode;
}

function MessageDisplay({ children }: Props) {
  return <div className="message-display">{children}</div>;
}

export default MessageDisplay;
