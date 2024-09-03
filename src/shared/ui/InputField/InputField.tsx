import React from "react";

import styles from "./InputField.module.scss";

interface IInputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  type?: "number" | "text";
  disabled?: boolean;
  error?: string | null;
  onBlur?: () => void;
}

const InputField: React.FC<IInputFieldProps> = ({
  label,
  value,
  onChange,
  required = false,
  placeholder,
  type = "text",
  disabled = false,
  error,
  onBlur,
}) => (
  <div className={styles.inputField}>
    <label className={styles.label}>
      {label}
      <input
        className={`${styles.input} ${disabled && styles.disabled} ${error && styles.errorBorder}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        onBlur={onBlur}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </label>
  </div>
);

export default React.memo(InputField);
