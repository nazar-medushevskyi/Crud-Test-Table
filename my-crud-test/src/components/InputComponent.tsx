import React from 'react';

interface InputComponentProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const InputComponent: React.FC<InputComponentProps> = ({
  label,
  value,
  onChange,
  error,
}) => (

  <div className="md-form mb-5">
    <i className="fas fa-user prefix grey-text" />
    <label
      data-error="wrong"
      data-success="right"
      htmlFor="formInput"
    >
      {label}
    </label>
    <input
      type="text"
      id="formInput"
      className="form-control validate"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {error && <div className="text-danger mt-2">{error}</div>}
  </div>
);
