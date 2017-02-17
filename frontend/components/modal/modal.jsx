import React from 'react';

const Modal = ({ modal, modalType, clearModal }) => {
  if (!modal) return null;

  const className = modalType === "map" ? "modal-center-map" : "modal-center-form";

  return (
    <div className="modal-background" onClick={ clearModal }>
      <div className={ className } onClick={ e => e.stopPropagation() } >
        { modal }
      </div>
    </div>
  );
};

export default Modal;
