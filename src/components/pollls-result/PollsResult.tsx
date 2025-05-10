import styles from './PollsResult.module.css';
import OptionRating from '../option-rating/OptionRating'; 
import { useMemo } from 'react';

interface PollProps {
  id: string;
  title: string;
  description?: string;
  thumbnail?: {
    data: {
      type: string;
      data: number[];
    };
    contentType: string;
  };
  options: {
    _id: string;
    answer: string;
    voteCount: number;
  }[];
  startDate: string;
  endDate: string;
}

const PollsResult: React.FC<PollProps> = ({ 
  
  title, 
  description, 
  thumbnail, 
  options,
  startDate,
  endDate
}) => {
  const totalVotes = useMemo(() => {
    return options.reduce((sum, option) => sum + option.voteCount, 0);
  }, [options]);

  const getImageUrl = () => {
    if (!thumbnail?.data?.data?.length) return null;
    
    try {
      const byteArray = new Uint8Array(thumbnail.data.data);
      const blob = new Blob([byteArray], { type: thumbnail.contentType });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Image conversion error:", error);
      return null;
    }
  };

  const imageUrl = getImageUrl();
  const formattedDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <article className={styles.resultpoll_container}>
      <header className={styles.result_header}>
        <h3>{title}</h3>
        {description && <p className={styles.poll_description}>{description}</p>}
        
        <div className={styles.poll_meta}>
          <span>Total Votes: {totalVotes}</span>
          <span>Active: {formattedDate(startDate)} - {formattedDate(endDate)}</span>
        </div>

        {imageUrl && (
          <div className={styles.polls_header_img}>
            <img src={imageUrl} alt={title} />
          </div>
        )}
      </header>
      
      <ul className={styles.polls_list}>
        {options.map(option => (
          <OptionRating 
            key={option._id} 
            answer={option.answer} 
            voteCount={option.voteCount} 
            totalVotes={totalVotes} 
          />
        ))}
      </ul>
    </article>
  );
};

export default PollsResult;