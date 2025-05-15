import React, { useState } from "react";
import styles from "./Register.module.css";
import TextInputField from "../../components/input/text-input/TextInput";
import PrimaryButton from "../../components/buttons/primary-button/PrimaryButton";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import logoImage from "../../assets/images/poll-logo.jpg";

const Register: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    identifier: "", // Email
    matricNumber: "", // Matric number
    role: "", // Role (e.g., student, lecturer)
    password: "",
    password2: "",
  });

  // Error state
  const [error, setError] = useState<string>("");

  // Loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Navigation hook
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange =
    (field: keyof typeof formData) => (value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  // Handle form submission
  const handleRegister = async () => {
    const { name, identifier, matricNumber, role, password, password2 } =
      formData;

    //  Validation Logic
    if (!name) {
      setError("Full name is required.");
      return;
    }

    if (!identifier && !matricNumber) {
      setError("Either email or matric number is required.");
      return;
    }

    if (!role) {
      setError("Role is required.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

    if (!password2) {
      setError("Password confirmation is required.");
      return;
    }

    if (password !== password2) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_REACT_APP_URL;
      console.log("Calling API:", `${apiUrl}/users/register`);

      const response = await axios.post(`${apiUrl}/users/register`, {
        fullname: name,
        email: identifier,
        matricNumber,
        role,
        password,
        password2,
      });

      if (response.status === 201) {
        alert("Registration successful! You can now log in.");
        navigate("/");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{
          message?: string;
          error?: string;
        }>;
        console.error("Axios error:", axiosError.response?.data);
        const errorMessage =
          axiosError.response?.data?.message ||
          axiosError.response?.data?.error ||
          "An unexpected error occurred.";
        setError(errorMessage);
      } else {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img src={logoImage} className={styles.logoImg} alt="Poll Logo" />
        <h1 className={styles.header}>Create an Account</h1>
        <p className={styles.subtitle}>
          Join the Department Poll Portal today!
        </p>

        {/* Error Message */}
        {error && <p className={styles.form_error_message}>{error}</p>}

        {/* Name Input */}
        <TextInputField
          type="text"
          id="name"
          label="Full Name"
          value={formData.name}
          onChange={handleInputChange("name")}
        />

        {/* Identifier Input (Email) */}
        <TextInputField
          type="text"
          id="identifier"
          label="Email Address"
          value={formData.identifier}
          onChange={handleInputChange("identifier")}
        />

        {/* Matric Number Input */}
        <TextInputField
          type="text"
          id="matricNumber"
          label="Matric Number (only students should input there matirc no)"
          value={formData.matricNumber}
          onChange={handleInputChange("matricNumber")}
        />

        {/* Role Input */}
        <TextInputField
          type="text"
          id="role"
          label="Role (e.g., student, staff)"
          value={formData.role}
          onChange={handleInputChange("role")}
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
          value={formData.password2}
          onChange={handleInputChange("password2")}
          showPasswordToggle={true}
        />

        {/* Register Button */}
        <div className={styles.buttonWrapper}>
          <PrimaryButton
            className={styles.registerButton}
            placeholder={isLoading ? "Registering..." : "Register"}
            onClick={handleRegister}
            disabled={
              !formData.name ||
              (!formData.identifier && !formData.matricNumber) ||
              !formData.role ||
              !formData.password ||
              !formData.password2 ||
              isLoading
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
    </div>
  );
};

export default Register;
