import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import styles from './PollDetails.module.css';
import { polls, options, users } from '../../mockdata/data';
import { useParams } from 'react-router-dom';
import PollOption from '../../components/poll-option/PollOption';
import { IoAddOutline } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { UiActions } from '../../store/slices/ui-slice';
import AddOptionModal from '../../components/modals/add-option-modal/AddOptionModal';
const PollDetails = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const currentPoll = polls.find((poll) => poll.id === id);
    const pollsOptions = options.filter((option) => option.pollId === id);
    const addOptionModalShowing = useAppSelector((state) => state.ui.addOptionModalShowing);
    const openModal = () => {
        dispatch(UiActions.openAddOptionModal());
    };
    if (!currentPoll) {
        return _jsx("div", { children: "Poll not found" });
    }
    return (_jsxs(_Fragment, { children: [_jsx("section", { className: styles.pollDetails, children: _jsxs("div", { className: `container ${styles.pollDetails_container}`, children: [_jsx("h2", { children: currentPoll.title }), currentPoll.description && _jsx("p", { children: currentPoll.description }), _jsx("div", { className: styles.pollDetails_image, children: _jsx("img", { src: currentPoll.thumbnail, alt: currentPoll.title }) }), _jsxs("menu", { className: styles.poll_details_option, children: [pollsOptions.map((option) => (_jsx(PollOption, { answer: option.answer, voteCount: option.voteCount }, option.id))), _jsx("button", { onClick: openModal, className: styles.add_option_btn, children: _jsx(IoAddOutline, {}) })] }), _jsxs("article", { className: styles.voters, children: [_jsx("h2", { children: "Voters" }), _jsxs("table", { className: styles.voters_table, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Full name" }), _jsx("th", { children: "Email Address" }), _jsx("th", { children: "Role" }), _jsx("th", { children: "Time" })] }) }), _jsx("tbody", { children: users.map((user) => (_jsxs("tr", { children: [_jsx("td", { children: _jsx("h5", { children: user.fullName }) }), _jsx("td", { children: user.email }), _jsx("td", { children: user.role }), _jsx("td", { children: "14:34:2" })] }, user.id))) })] })] })] }) }), addOptionModalShowing && _jsx(AddOptionModal, {})] }));
};
export default PollDetails;
