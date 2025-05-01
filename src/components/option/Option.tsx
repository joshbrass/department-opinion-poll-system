import styles from './Option.module.css';

interface OptionProps {
  id: string;
  answer: string;
  onVoteClick?: () => void;
}

const Option: React.FC<OptionProps> = ({ answer, onVoteClick }) => {
  return (
    <article className={styles.option}>
      <div></div>
      <h5>{answer}</h5>
      <button className="btn primary" onClick={onVoteClick}>
        Vote
      </button>
    </article>
  );
};

export default Option;
