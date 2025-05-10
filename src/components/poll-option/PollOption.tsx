import styles from './PollOption.module.css';

interface PollOptionProps {
  answer: string;
  voteCount: number;
  voters?: Array<{
    _id: string;
    name?: string;
    email: string;
  }>;
}

const PollOption = ({ answer, voteCount, voters = [] }: PollOptionProps) => {
  return (
    <div className={styles.option}>
      <div className={styles.option_content}>
        <h3>{answer}</h3>
        <div className={styles.option_meta}>
          <span className={styles.voteCount}>{voteCount} votes</span>
          {voters.length > 0 && (
            <span className={styles.voterCount}>{voters.length} voters</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PollOption;