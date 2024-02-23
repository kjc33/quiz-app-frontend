import React from "react";

import "./Modal.scss";

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close-btn" onClick={onClose}>
          X
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
