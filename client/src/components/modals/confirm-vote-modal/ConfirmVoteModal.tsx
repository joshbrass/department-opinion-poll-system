import styles from './ConfirmVoteModal.module.css';
import { options } from '../../../mockdata/data';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks/reduxHooks'

interface Opinion {
  id: string;
  answer: string;
}

interface ConfirmVoteModalProps {
  opinionId: string;
  onCancel: () => void;
  onConfirm: (opinion: Opinion) => void;
}

const ConfirmVoteModal: React.FC<ConfirmVoteModalProps> = ({ 
  opinionId, 
  onCancel, 
  onConfirm 
}) => {
  const [modalOpinion, setModalOpinion] = useState<Opinion | null>(null);
  const currentVoter = useAppSelector((state) => state.vote.currentVoter); // Updated hook

  useEffect(() => {
    const selectedOpinion = options.find(opinion => opinion.id === opinionId);
    if (selectedOpinion) {
      setModalOpinion(selectedOpinion);
    }
  }, [opinionId]);

  return (
    <section className="modal">
      <div className={`${styles.confirm_vote_content} modal_content`}>
        <h5>Please confirm your vote</h5>
        {currentVoter.isAdmin && (
          <p className={styles.adminNote}>(Admin voting mode)</p>
        )}
        <h2>{modalOpinion?.answer}</h2>
        <div className={styles.confirm_vote_cta}>
          <button className="btn" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="btn primary"
            onClick={() => modalOpinion && onConfirm(modalOpinion)}
          >
            Confirm
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConfirmVoteModal;