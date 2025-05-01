import { Link } from 'react-router-dom'
import styles from './Congrats.module.css'

const Congrats = () => {
  return (
    <section className={styles.congrats}>
      <div className={`container ${styles.congrats_container}`}>
        <h2>Thanks for your vote!</h2>
        <p>Your vote is now added to the poll's vote count. you will be redirected shortly to see the new result.</p>
        <Link to='/results' className="btn sm primary">See Results</Link>
      </div>
    </section>
  )
}

export default Congrats