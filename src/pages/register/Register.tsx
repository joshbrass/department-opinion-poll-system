import React, { useState } from "react";
import styles from "./Register.module.css";
import TextInputField from "../../components/input/text-input/TextInput";
import PrimaryButton from "../../components/buttons/primary-button/PrimaryButton";
import { Link } from "react-router-dom";
import logoImage from '../../assets/images/poll-logo.jpg'

const Register: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    identifier: "", // Either email or matric number
    password: "",
    confirmPassword: "",
  });

  // Handle input changes
  const handleInputChange =
    (field: keyof typeof formData) => (value: string) => {
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
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Failed to register. Please try again.");
    }
  };
  console.log(formData)

  return (
    <div className={styles.container}>
      <img src={logoImage} className={styles.logoImg} alt="" />
      <h1 className={styles.header}>Create an Account</h1>
      <p className={styles.subtitle}>Join the Department Poll Portal today!</p>

      {/* Name Input */}
      <TextInputField
        type="text"
        id="name"
        label="Full Name"
        value={formData.name}
        onChange={handleInputChange("name")}
      />

      {/* Identifier Input (Email or Matric Number) */}
      <TextInputField
        type="text"
        id="identifier"
        label="Email Address or Matric Number"
        value={formData.identifier}
        onChange={handleInputChange("identifier")}
      />

      {/* Password Input */}
      <TextInputField
        type="password"
        id="password"
        label="Password"
        value={formData.password}
        onChange={handleInputChange("password")}
        showPasswordToggle={true}
      />

      {/* Confirm Password Input */}
      <TextInputField
        type="password"
        id="confirmPassword"
        label="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleInputChange("confirmPassword")}
        showPasswordToggle={true}
      />

      {/* Register Button */}
      <div className={styles.buttonWrapper}>
        <PrimaryButton
          className={styles.registerButton} // Optional: Add additional register-specific styles if needed
          placeholder="Register"
          onClick={handleRegister}
          disabled={
            !formData.name ||
            !formData.identifier ||
            !formData.password ||
            !formData.confirmPassword
          }
        />
      </div>

      {/* Redirect to Login */}
      <div className={styles.loginRedirect}>
        <p>
          Already have an account?{" "}
          <Link to="/" className={styles.loginLink}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;