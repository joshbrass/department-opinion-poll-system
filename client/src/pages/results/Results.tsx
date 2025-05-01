import { useState } from 'react';
import styles from './Results.module.css'; 
import { polls as dummyPolls } from '../../mockdata/data';

import PollsResult from '../../components/pollls-result/PollsResult';

const Results = () => {
  const [polls, ] = useState(dummyPolls);

  return (
    <section className={styles.results_container}>
      <div className={`container ${styles.results_wrapper}`}>
        {polls.map(poll => (
          <PollsResult key={poll.id} {...poll} />
        ))}
      </div>
    </section>
  );
};

export default Results;