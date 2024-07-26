import React, { useContext } from "react";
import "./modal.css";
import { UIContext } from "../../../hooks/context/UIContext";

export const Modal: React.FC = () => {
  const { isModalOpen, modalContent } = useContext(UIContext);
  return (
    <div className={`modal-container ${isModalOpen ? "open" : ""}`}>
      <div className="modal-content">{modalContent}</div>
    </div>
  );
};
