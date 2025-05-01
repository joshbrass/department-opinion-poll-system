import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PollsList.module.css';
import { polls as dummyPolls } from '../../mockdata/data';

const PollsList = () => {
  const [polls] = useState(dummyPolls);
  const navigate = useNavigate();

  return (
    <section className={styles.polls_container}>
      <div className={`container ${styles.polls_wrapper}`}>
        <h2>Available Polls</h2>
        {polls.map(poll => (
          <div key={poll.id} className={styles.poll_card}>
            <h3>{poll.title}</h3>
            <p>{poll.description}</p>
            {poll.thumbnail && (
              <img 
                src={poll.thumbnail} 
                alt={poll.title} 
                className={styles.thumbnail}
              />
            )}
            <button 
              onClick={() => navigate(`/polls/${poll.id}/option`)}
              className={styles.vote_button}
            >
              Vote Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PollsList;