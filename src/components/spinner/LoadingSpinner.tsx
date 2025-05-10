import styles from './LoadingSpinner.module.css';



const LoadingSpinner = () => {
  return (
    <div className={styles.spinner_wrapper}>
      <div className={styles.loader}></div>
    </div>
  );
};


export default LoadingSpinner;