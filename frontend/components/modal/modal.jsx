import React from 'react';

const Modal = ({ modal, modalType, clearModal }) => {
  if (!modal) return null;

  return (
    <div className="modal-background" onClick={ clearModal }>
      <div className={ `modal-center-${modalType}` } onClick={ e => e.stopPropagation() } >
        { modal }
      </div>
    </div>
  );
};

export default Modal;
