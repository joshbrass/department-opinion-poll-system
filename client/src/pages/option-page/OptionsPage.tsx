import styles from "./OptionsPage.module.css";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks"
import { options as dummyOptions } from "../../mockdata/data";
import Option from "../../components/option/Option";
import ConfirmVoteModal from "../../components/modals/confirm-vote-modal/ConfirmVoteModal";
import { voteActions } from "../../store/slices/vote-slice";
import { UiActions } from "../../store/slices/ui-slice";

const OptionsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch(); 
  
  // Get state from Redux store
  const { selectedVoterOption, selectedPoll } = useAppSelector((state) => state.vote);
  const { voteOpinionModalShowing } = useAppSelector((state) => state.ui);

  const filteredOptions = dummyOptions.filter((option) => option.pollId === id);

  const handleVoteClick = (opinionId: string) => {
    dispatch(voteActions.changeSelectedVoteOption(opinionId));
    dispatch(voteActions.changeSelectedPoll(id || ''));
    dispatch(UiActions.openVoteOpinionModal());
  };

  const handleCancel = () => {
    dispatch(UiActions.closeVoteOpinionModal());
    dispatch(voteActions.changeSelectedVoteOption(''));
  };

  const handleConfirm = (opinion: { id: string; answer: string }) => {
    console.log("Vote confirmed for:", opinion);
    dispatch(UiActions.closeVoteOpinionModal());
    dispatch(voteActions.changeSelectedVoteOption(''));
  };
  

  return (
    <>
      <section className={styles.options}>
        <header className={styles.options_header}>
          <h1>What's your opinion?</h1>
          <p>
            These are the options for the selected poll. Please vote once,
            because you won't be allowed to vote on this poll again.
          </p>
        </header>
        <div className={styles.opinion_container}>
          {filteredOptions.map((option) => (
            <Option
              key={option.id}
              {...option}
              onVoteClick={() => handleVoteClick(option.id)}
            />
          ))}
        </div>
      </section>

      {voteOpinionModalShowing && selectedVoterOption && (
        <ConfirmVoteModal
          opinionId={selectedVoterOption}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
};

export default OptionsPage;