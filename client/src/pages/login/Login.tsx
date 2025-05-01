import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import TextInputField from "../../components/input/text-input/TextInput";
import logoImage from '../../assets/images/poll-logo.jpg'
import PrimaryButton from "../../components/buttons/primary-button/PrimaryButton";

const Login: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState({
    identifier: "", // This will hold either email or matric number
    password: "",
  });

  // Handle input changes
  const handleInputChange =
    (field: keyof typeof formData) => (value: string) => {
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
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Failed to sign in. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <img src={logoImage} className={styles.logoImg} alt="" />
      <h1 className={styles.header}>Sign In To The Department Poll Portal</h1>
      <p className={styles.subtitle}>Welcome back! Please enter your details.</p>

      <p className={styles.form_error_message}> form error message</p>

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

      {/* Login Button */}
      <div className={styles.buttonWrapper}>
        <PrimaryButton
          className={styles.loginButton}
          placeholder="Sign In"
          onClick={handleSignIn}
          disabled={!formData.password || !formData.identifier}
        />
      </div>
      

      {/* Redirect to Sign Up */}
      <div className={styles.signupRedirect}>
        <p>
          Don't have an account?{" "}
          <Link to="/register" className={styles.signupLink}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;