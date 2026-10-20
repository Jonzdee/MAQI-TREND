import type { ChangeEvent } from "react";

type FormFieldProps = {
  label: string;
  value: string;
  error?: string;
  type?: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const FormField = ({
  label,
  value,
  error,
  type = "text",
  placeholder,
  onChange,
}: FormFieldProps) => (
  <div className="mq-field">
    <p className="mq-field-label">{label}</p>
    <input
      onChange={onChange}
      value={value}
      className="mq-field-input"
      type={type}
      placeholder={placeholder}
    />
    {error && (
      <p className="mq-field-error">
        <span className="mq-field-error-mark">!</span>
        {error}
      </p>
    )}
  </div>
);

export default FormField;
