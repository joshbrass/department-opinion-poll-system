import styles from './PollDetails.module.css'
import { polls, options, users } from '../../mockdata/data'
import { useParams } from 'react-router-dom'
import PollOption from '../../components/poll-option/PollOption'
import { IoAddOutline } from 'react-icons/io5'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks' 
import { UiActions } from '../../store/slices/ui-slice'
import AddOptionModal from '../../components/modals/add-option-modal/AddOptionModal'

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

interface Option {
  id: string;
  pollId: string;
  answer: string;
  voteCount: number;
}

interface Poll {
  id: string;
  title: string;
  description?: string;
  thumbnail: string;
}

const PollDetails = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams<{ id: string }>()

  const currentPoll = polls.find((poll: Poll) => poll.id === id)
  const pollsOptions = options.filter((option: Option) => option.pollId === id)
  const addOptionModalShowing = useAppSelector((state) => state.ui.addOptionModalShowing)

  const openModal = () => {
    dispatch(UiActions.openAddOptionModal())
  }

  if (!currentPoll) {
    return <div>Poll not found</div>
  }

  return (
    <>
      <section className={styles.pollDetails}>
        <div className={`container ${styles.pollDetails_container}`}>
          <h2>{currentPoll.title}</h2>
          {currentPoll.description && <p>{currentPoll.description}</p>}
          <div className={styles.pollDetails_image}>
            <img src={currentPoll.thumbnail} alt={currentPoll.title} />
          </div>
          <menu className={styles.poll_details_option}>
            {pollsOptions.map((option: Option) => (
              <PollOption key={option.id} answer={option.answer} voteCount={option.voteCount} />
            ))}
            <button onClick={openModal} className={styles.add_option_btn}>
              <IoAddOutline />
            </button>
          </menu>
          <article className={styles.voters}>
            <h2>Voters</h2>
            <table className={styles.voters_table}>
              <thead>
                <tr>
                  <th>Full name</th>
                  <th>Email Address</th>
                  <th>Role</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: User) => (
                  <tr key={user.id}>
                    <td><h5>{user.fullName}</h5></td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>14:34:2</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        </div>
      </section>

      {addOptionModalShowing && <AddOptionModal />}
    </>
  )
}

export default PollDetails