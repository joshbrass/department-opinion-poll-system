import styles from './PollsResult.module.css';
import { options } from '../../mockdata/data';
import OptionRating from '../option-rating/OptionRating'; 
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface PollProps {
  id: string;
  thumbnail: string;
  title: string;
}

const PollsResult: React.FC<PollProps> = ({ id, thumbnail, title }) => {
  const [totalVotes, setTotalVote] = useState(521);

  // Get options that belong to this poll
  const pollOptions = options.filter(option => option.pollId === id);

  return (
    <article className={styles.resultpoll_container}>
      <header className={styles.result_header}>
        <h4>{title}</h4>
        <div className={styles.polls_header_img}>
          <img src={thumbnail} alt={title} />
        </div>
        
      </header>
      <ul className={styles.polls_list}>
          {pollOptions.map(option => (
            <OptionRating key={option.id} {...option} totalVotes={totalVotes} />
          ))}
        </ul>
        {/* <Link to={`/polls/${id}/option`} className='btn primary full'>Enter Polls</Link> */}
    </article>
  );
};

export default PollsResult;