import styles from "./ErrorPage.module.css";
import image from '../../assets/images/404.gif'
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

    return (
        <section className={styles.errorPage}>
            <div className={styles.errorPage_container}>
                <img src={image} alt="" />
                <h1>404</h1>
                <p>This page does not exist. You will be redirected to the login page shortly</p>
            </div>
        </section>
    );
};

export default ErrorPage;