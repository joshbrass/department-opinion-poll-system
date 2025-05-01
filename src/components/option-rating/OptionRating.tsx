import React from "react";
import styles from "./OptionRating.module.css";

interface OptionRatingProps {
  id: string;
  answer: string;
  voteCount: number;
  pollId: string;
  totalVotes: number;
}

const OptionRating: React.FC<OptionRatingProps> = ({
  answer,
  voteCount,
  totalVotes,
}) => {
  return (
    <li className={styles.result_option}>
      <div className={styles.result_option_info}>
        <div>
          <h5>{answer}</h5>
          <small>{`${voteCount} ${voteCount === 1 ? "vote" : "votes"}`}</small>
        </div>
        <div className={styles.results_option_rating}>
          <div className={styles.result_option_loader}>
            <span
              style={{
                width: `${voteCount > 0 ? (voteCount / totalVotes) * 100 : 0}%`,
              }}
            ></span>
          </div>
          <small>{`${
            voteCount > 0 ? ((voteCount / totalVotes) * 100).toFixed(2) : 0
          }%`}</small>
        </div>
      </div>
    </li>
  );
};

export default OptionRating;
