import React from "react";

import "./Modal.scss";

const Modal = ({ children }) => {
  return (
    <div className="modal-exam-editor">
      {children}
    </div>
  );
};

export default Modal;
