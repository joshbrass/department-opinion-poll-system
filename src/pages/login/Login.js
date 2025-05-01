import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import TextInputField from "../../components/input/text-input/TextInput";
import logoImage from '../../assets/images/poll-logo.jpg';
import PrimaryButton from "../../components/buttons/primary-button/PrimaryButton";
const Login = () => {
    // Form state
    const [formData, setFormData] = useState({
        identifier: "", // This will hold either email or matric number
        password: "",
    });
    // Handle input changes
    const handleInputChange = (field) => (value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };
    // Handle sign-in logic
    const handleSignIn = async () => {
        const { identifier, password } = formData;
        // Validation logic
        if (!identifier) {
            alert("Please provide either an email address or a matric number.");
            return;
        }
        if (!password) {
            alert("Please provide a password.");
            return;
        }
        // Example API call logic (replace this with your backend logic)
        try {
            console.log("Signing in with:", { identifier, password });
            // Perform sign-in logic here
        }
        catch (error) {
            console.error("Error signing in:", error);
            alert("Failed to sign in. Please try again.");
        }
    };
    return (_jsxs("div", { className: styles.container, children: [_jsx("img", { src: logoImage, className: styles.logoImg, alt: "" }), _jsx("h1", { className: styles.header, children: "Sign In To The Department Poll Portal" }), _jsx("p", { className: styles.subtitle, children: "Welcome back! Please enter your details." }), _jsx("p", { className: styles.form_error_message, children: " form error message" }), _jsx(TextInputField, { type: "text", id: "identifier", label: "Email Address or Matric Number", value: formData.identifier, onChange: handleInputChange("identifier") }), _jsx(TextInputField, { type: "password", id: "password", label: "Password", value: formData.password, onChange: handleInputChange("password"), showPasswordToggle: true }), _jsx("div", { className: styles.buttonWrapper, children: _jsx(PrimaryButton, { className: styles.loginButton, placeholder: "Sign In", onClick: handleSignIn, disabled: !formData.password || !formData.identifier }) }), _jsx("div", { className: styles.signupRedirect, children: _jsxs("p", { children: ["Don't have an account?", " ", _jsx(Link, { to: "/register", className: styles.signupLink, children: "Sign up" })] }) })] }));
};
export default Login;
