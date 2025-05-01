import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from './TextInput.module.css';
const TextInputField = ({ type = 'text', id, label, value, onChange, showPasswordToggle = false, }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const inputType = type === 'password' && showPassword ? 'text' : type;
    return (_jsxs("div", { className: styles.inputContainer, children: [_jsx("label", { className: `${styles.label} ${isFocused || value ? styles.labelFocused : ''}`, htmlFor: id, children: label }), _jsxs("div", { className: styles.inputWrapper, children: [_jsx("input", { id: id, type: inputType, value: value, onChange: (e) => onChange(e.target.value), onFocus: () => setIsFocused(true), onBlur: () => setIsFocused(false), className: styles.input }), showPasswordToggle && (_jsx("button", { type: "button", className: styles.togglePassword, onClick: () => setShowPassword(!showPassword), children: showPassword ? _jsx(FaEyeSlash, { size: 20 }) : _jsx(FaEye, { size: 20 }) }))] })] }));
};
export default TextInputField;
