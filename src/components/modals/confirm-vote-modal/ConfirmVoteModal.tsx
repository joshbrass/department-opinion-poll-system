import styles from "./ConfirmVoteModal.module.css";
import { useAppSelector } from "../../../hooks/reduxHooks";
import LoadingSpinner from "../../spinner/LoadingSpinner";

interface ConfirmVoteModalProps {
  opinionId: string;
  opinionAnswer: string;
  onCancel: () => void;
  onConfirm: () => void;
  isSubmitting: boolean;
}

const ConfirmVoteModal: React.FC<ConfirmVoteModalProps> = ({
  opinionAnswer,
  onCancel,
  onConfirm,
  isSubmitting,
}) => {
  const currentUser = useAppSelector((state) => state.user.currentUser);

  return (
    <section className="modal">
      <div className={`${styles.confirm_vote_content} modal_content`}>
        <h5>Please confirm your vote</h5>
        {currentUser && currentUser.isAdmin && (
          <p className={styles.adminNote}>(Admin voting mode)</p>
        )}
        <h2>{opinionAnswer}</h2>
        <div className={styles.confirm_vote_cta}>
          <button className="btn" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </button>
          <button
            className="btn primary"
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? <LoadingSpinner /> : "Confirm"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConfirmVoteModal;
