import React from "react";

interface Props {
  children: React.ReactNode;
}

const MessageDisplay: React.FC<Props> = ({ children }) => {
  return <div className="message-display">{children}</div>;
};

export default MessageDisplay;
