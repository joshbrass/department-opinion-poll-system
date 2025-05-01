import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./SecondaryButton.css";
function SecondaryButton({ className, placeholder, disabled = false, type = "button", onClick, iconSrc, iconAlt = "", }) {
    return (_jsx("div", { className: `secondary-button-wrapper ${className}`, children: _jsxs("button", { type: type, disabled: disabled, onClick: onClick, children: [placeholder, iconSrc && (_jsx("img", { src: iconSrc, alt: iconAlt, className: "button-icon" }))] }) }));
}
export default SecondaryButton;
