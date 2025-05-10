import styles from './Option.module.css';

interface OptionProps {
  id: string;
  answer: string;
  voteCount?: number;
  onVoteClick?: () => void;
}

const Option: React.FC<OptionProps> = ({ answer, voteCount = 0, onVoteClick }) => {
  return (
    <article className={styles.option}>
      <div className={styles.option_content}>
        <h5>{answer}</h5>
        <span className={styles.vote_count}>{voteCount} votes</span>
      </div>
      <button className="btn primary" onClick={onVoteClick}>
        Vote
      </button>
    </article>
  );
};

export default Option;