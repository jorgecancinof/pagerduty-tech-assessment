import React from "react";

interface Props {
  children: React.ReactNode;
}

export const MessageDisplay: React.FC<Props> = ({ children }) => {
  return <div className="message-display">{children}</div>;
};
