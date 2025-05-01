import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from './TextInput.module.css';

interface InputFieldProps {
  type?: 'text' | 'email' | 'password';
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  showPasswordToggle?: boolean;
}

const TextInputField: React.FC<InputFieldProps> = ({
  type = 'text',
  id,
  label,
  value,
  onChange,
  showPasswordToggle = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={styles.inputContainer}>
      <label
        className={`${styles.label} ${isFocused || value ? styles.labelFocused : ''}`}
        htmlFor={id}
      >
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={styles.input}
        />
        {showPasswordToggle && (
          <button
            type="button"
            className={styles.togglePassword}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default TextInputField;