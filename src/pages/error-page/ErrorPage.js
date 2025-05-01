import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./ErrorPage.module.css";
import image from '../../assets/images/404.gif';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
    const navigate = useNavigate();
    // Redirect users to login page after 6 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/login');
        }, 6000);
        return () => clearTimeout(timer);
    }, [navigate]);
    return (_jsx("section", { className: styles.errorPage, children: _jsxs("div", { className: styles.errorPage_container, children: [_jsx("img", { src: image, alt: "" }), _jsx("h1", { children: "404" }), _jsx("p", { children: "This page does not exist. You will be redirected to the login page shortly" })] }) }));
};
export default ErrorPage;
