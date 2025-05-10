import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import TextInputField from "../../components/input/text-input/TextInput";
import logoImage from "../../assets/images/poll-logo.jpg";
import PrimaryButton from "../../components/buttons/primary-button/PrimaryButton";
import axios, { AxiosError } from "axios"; // Import AxiosError for error typing
import { useDispatch } from "react-redux";
import { userActions } from "../../store/slices/user-slice";

const Login: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState({
    identifier: "", // This holds either email or matric number
    password: "",
  });

  // Error state
  const [error, setError] = useState<string>("");

  // Loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Redux dispatch
  const dispatch = useDispatch();

  // Navigation hook
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange =
    (field: keyof typeof formData) => (value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  // Handle sign-in logic
  const handleSignIn = async () => {
    const { identifier, password } = formData;

    // Validation logic
    if (!identifier.trim()) {
      setError("Please provide either an email address or a matric number.");
      return;
    }
    if (!password.trim()) {
      setError("Please provide a password.");
      return;
    }

    setError(""); // Clear any existing errors
    setIsLoading(true); // Set loading state

    try {
      // API request to login
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_URL}/users/login`,
        {
          emailOrMatric: formData.identifier,
          password: formData.password,
        }
      );

      // Extract user data and token from the response
      const { data, token } = response.data;

      if (!token || !data) {
        throw new Error("Invalid response from server.");
      }

      // Save token and user data in local storage
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(data));

      // Dispatch user data to Redux store
      dispatch(
        userActions.changeCurrentUser({
          id: data._id,
          token,
          isAdmin: data.isAdmin,
        })
      );

      // Redirect based on admin status
      if (data.isAdmin) {
        navigate("/admin"); // Redirect to admin page
      } else {
        navigate("/poll-list"); // Redirect to poll-list page
      }
    } catch (err) {
      // Ensure err is typed as AxiosError
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ message?: string }>;
        setError(
          axiosError.response?.data?.message || "An unexpected error occurred."
        );
      } else {
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
        <h1 className={styles.header}>Sign In To The Department Poll Portal</h1>
        <p className={styles.subtitle}>
          Welcome back! Please enter your details.
        </p>

        {/* Error Message */}
        {error && <p className={styles.form_error_message}>{error}</p>}

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
            placeholder={isLoading ? "Signing In..." : "Sign In"}
            onClick={handleSignIn}
            disabled={
              !formData.password.trim() ||
              !formData.identifier.trim() ||
              isLoading
            }
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
    </div>
  );
};

export default Login;
