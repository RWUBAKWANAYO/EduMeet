import React from "react";
import { Modal } from "./shared/modal/Modal";
import { MeetingCallCards } from "./shared/cards";

export const GlobalComponents: React.FC = () => {
  return (
    <>
      <Modal />
      <MeetingCallCards />
    </>
  );
};
