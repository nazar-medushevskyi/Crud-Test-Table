import React, { FC, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

export const ModalPortal: FC<PropsWithChildren<{ onClose: () => void, isOpen: boolean }>> = ({ onClose, children, isOpen }) => {
  if (!isOpen) return null;

  return createPortal(<div
    className="backdrop"
    onClick={onClose}
  >
    <div className="modal-container" onClick={e => e.stopPropagation()}>
      {children}
    </div>
  </div>, document.body)
}
