import styles from './LogOut.module.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { userActions } from '../../store/slices/user-slice';
import LoadingSpinner from '../../components/spinner/LoadingSpinner';

const LogOut = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      // Clear user data from Redux store
      dispatch(userActions.logoutUser());
      
      // Clear authentication token from localStorage
      localStorage.removeItem('authToken');
      
      // Optional: Clear any other stored data
      localStorage.removeItem('persist:root');
      
      // Redirect to home page after a brief delay
      setTimeout(() => {
        navigate('/');
      }, 1500);
    };

    logoutUser();
  }, [dispatch, navigate]);

  return (
    <div className={styles.log_out_container}>
      <div className={styles.log_out_content}>
        <h2>Logging you out...</h2>
        <p>You're being safely logged out of your account.</p>
        <LoadingSpinner />
      </div>
    </div>
  );
};

export default LogOut;