import styles from './OptionRating.module.css';

interface OptionRatingProps {
  answer: string;
  voteCount: number;
  totalVotes: number;
}

const OptionRating: React.FC<OptionRatingProps> = ({ 
  answer, 
  voteCount, 
  totalVotes 
}) => {
  const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;

  return (
    <li className={styles.option_item}>
      <div className={styles.option_info}>
        <span className={styles.option_text}>{answer}</span>
        <span className={styles.option_stats}>
          {voteCount} votes ({percentage}%)
        </span>
      </div>
      <div className={styles.option_bar_container}>
        <div 
          className={styles.option_bar} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </li>
  );
};

export default OptionRating;