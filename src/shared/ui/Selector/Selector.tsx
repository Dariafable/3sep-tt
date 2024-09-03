import React from "react";

import styles from "./Selector.module.scss";

interface ISelectProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  disabled?: boolean;
}

const Select: React.FC<ISelectProps> = ({
  label,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
}) => (
  <div className={styles.selector}>
    <label className={styles.label}>
      {label}
      <select
        className={`${styles.select} ${disabled && styles.disabled}`}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      >
        {options.map((option) => (
          <option className={styles.option} key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  </div>
);

export default React.memo(Select);
