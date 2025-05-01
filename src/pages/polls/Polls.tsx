import styles from "./Polls.module.css";
import { polls as dummyPolls } from "../../mockdata/data";
import { useState } from "react";
import Poll from "../../components/poll/Poll";
import AddPollModal from "../../components/add-poll-modal/AddPollModal";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks"; 
import { UiActions } from "../../store/slices/ui-slice";
import UpdatePollModal from "../../components/modals/update-poll-modal/UpdatePollModal";

const Polls = () => {
  const [polls, ] = useState(dummyPolls);
  const dispatch = useAppDispatch();
  const pollModalShowing = useAppSelector((state) => state.ui.pollModalShowing);
  const updatePollModalShowing = useAppSelector((state) => state.ui.updatePollModalShowing);

  const openModal = () => {
    dispatch(UiActions.openPollModal());
  };

  return (
    <>
      <section className={styles.polls}>
        <div className={`container ${styles.polls_container}`}>
          <header className={styles.polls_header}>
            <h1>Ongoing Polls</h1>
            <button className="btn primary" onClick={openModal}>
              Create new Poll
            </button>
          </header>
          <menu className={styles.polls_menu}>
            {polls.map((poll) => (
              <Poll key={poll.id} {...poll} />
            ))}
          </menu>
        </div>
      </section>

      {pollModalShowing && <AddPollModal />}
      {updatePollModalShowing && <UpdatePollModal />}
    </>
  );
};

export default Polls;