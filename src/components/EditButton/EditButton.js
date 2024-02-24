import React from "react";

import "./EditButton.scss";

const EditButton = ({ className, type, onClick, btnText }) => {
  return (
    <button className={className} type={type} onClick={onClick}>
      {btnText}
    </button>
  );
};

export default EditButton;
