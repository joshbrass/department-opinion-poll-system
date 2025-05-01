import { IoMdTrash } from 'react-icons/io'
import styles from './PollOption.module.css'

interface PollOptionProps {
  answer: string;
  voteCount: number;
  onDelete?: () => void; 
}

const PollOption: React.FC<PollOptionProps> = ({ answer, voteCount, onDelete }) => {
  return (
    <li className={styles.poll_option}>
      <div>
        <h5>{answer}</h5>
        <small>{voteCount} vote{voteCount !== 1 ? 's' : ''}</small>
        {onDelete && (
          <button 
            className={styles.poll_option__btn}
            onClick={onDelete}
            aria-label={`Delete option "${answer}"`}
          >
            <IoMdTrash/>
          </button>
        )}
      </div>
    </li>
  )
}

export default PollOption