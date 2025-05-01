import { jsx as _jsx } from "react/jsx-runtime";
import "./PrimaryButton.css";
function PrimaryButton({ className, placeholder, disabled = false, onClick, }) {
    return (_jsx("div", { className: `primary-button-wrapper ${className}`, children: _jsx("button", { disabled: disabled, onClick: onClick, children: placeholder }) }));
}
export default PrimaryButton;
