import React from 'react';

import { ModalPortal } from './ModalPortal'
import { InputComponent } from './InputComponent';

interface CrudModalProps {
  isOpen: boolean;

  title: string;
  action: string;

  addNewTitle: string;
  addNewText: string;
  setAddNewTitle: (value: string) => void;
  setAddNewText: (value: string) => void;

  error: string;

  onSubmit: () => void
  onClose: () => void
}

export const CrudModalAddEdit: React.FC<CrudModalProps> = ({
  isOpen,

  action,
  title,

  addNewTitle,
  addNewText,
  setAddNewTitle,
  setAddNewText,

  error,

  onSubmit,
  onClose,
}) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onSubmit();
  }

  return (

    <ModalPortal onClose={onClose} isOpen={isOpen}>

      <div className="modal-content">
        <div className="modal-header text-center">
          <h4 className="modal-title w-100 font-weight-bold">
            {title}
          </h4>

          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={onClose}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div className="modal-body mx-3">
          <InputComponent
            label="Enter the title"
            value={addNewTitle}
            onChange={setAddNewTitle}
            error={error}
          />

          <InputComponent
            label="Enter the text"
            value={addNewText}
            onChange={setAddNewText}
            error={error}
          />
        </div>

        <div className="modal-footer d-flex justify-content-center">
          <button
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            {action}
            <i className="fas fa-paper-plane-o ml-1" /></button>
        </div>
      </div>
    </ModalPortal>
  );
}
