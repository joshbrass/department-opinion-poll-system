import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import styles from "./Register.module.css";
import TextInputField from "../../components/input/text-input/TextInput";
import PrimaryButton from "../../components/buttons/primary-button/PrimaryButton";
import { Link } from "react-router-dom";
import logoImage from '../../assets/images/poll-logo.jpg';
const Register = () => {
    // Form state
    const [formData, setFormData] = useState({
        name: "",
        identifier: "", // Either email or matric number
        password: "",
        confirmPassword: "",
    });
    // Handle input changes
    const handleInputChange = (field) => (value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };
    // Handle form submission
    const handleRegister = async () => {
        const { name, identifier, password, confirmPassword } = formData;
        // Validation logic
        if (!name || !identifier || !password || !confirmPassword) {
            alert("Please fill in all fields.");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        try {
            console.log("Registering with:", { name, identifier, password });
            // Perform registration logic here (e.g., API call)
        }
        catch (error) {
            console.error("Error during registration:", error);
            alert("Failed to register. Please try again.");
        }
    };
    console.log(formData);
    return (_jsxs("div", { className: styles.container, children: [_jsx("img", { src: logoImage, className: styles.logoImg, alt: "" }), _jsx("h1", { className: styles.header, children: "Create an Account" }), _jsx("p", { className: styles.subtitle, children: "Join the Department Poll Portal today!" }), _jsx(TextInputField, { type: "text", id: "name", label: "Full Name", value: formData.name, onChange: handleInputChange("name") }), _jsx(TextInputField, { type: "text", id: "identifier", label: "Email Address or Matric Number", value: formData.identifier, onChange: handleInputChange("identifier") }), _jsx(TextInputField, { type: "password", id: "password", label: "Password", value: formData.password, onChange: handleInputChange("password"), showPasswordToggle: true }), _jsx(TextInputField, { type: "password", id: "confirmPassword", label: "Confirm Password", value: formData.confirmPassword, onChange: handleInputChange("confirmPassword"), showPasswordToggle: true }), _jsx("div", { className: styles.buttonWrapper, children: _jsx(PrimaryButton, { className: styles.registerButton, placeholder: "Register", onClick: handleRegister, disabled: !formData.name ||
                        !formData.identifier ||
                        !formData.password ||
                        !formData.confirmPassword }) }), _jsx("div", { className: styles.loginRedirect, children: _jsxs("p", { children: ["Already have an account?", " ", _jsx(Link, { to: "/", className: styles.loginLink, children: "Log in" })] }) })] }));
};
export default Register;
