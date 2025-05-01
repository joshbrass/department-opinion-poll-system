import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import styles from "./Polls.module.css";
import { polls as dummyPolls } from "../../mockdata/data";
import { useState } from "react";
import Poll from "../../components/poll/Poll";
import AddPollModal from "../../components/add-poll-modal/AddPollModal";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { UiActions } from "../../store/slices/ui-slice";
import UpdatePollModal from "../../components/modals/update-poll-modal/UpdatePollModal";
const Polls = () => {
    const [polls,] = useState(dummyPolls);
    const dispatch = useAppDispatch();
    const pollModalShowing = useAppSelector((state) => state.ui.pollModalShowing);
    const updatePollModalShowing = useAppSelector((state) => state.ui.updatePollModalShowing);
    const openModal = () => {
        dispatch(UiActions.openPollModal());
    };
    return (_jsxs(_Fragment, { children: [_jsx("section", { className: styles.polls, children: _jsxs("div", { className: `container ${styles.polls_container}`, children: [_jsxs("header", { className: styles.polls_header, children: [_jsx("h1", { children: "Ongoing Polls" }), _jsx("button", { className: "btn primary", onClick: openModal, children: "Create new Poll" })] }), _jsx("menu", { className: styles.polls_menu, children: polls.map((poll) => (_jsx(Poll, { ...poll }, poll.id))) })] }) }), pollModalShowing && _jsx(AddPollModal, {}), updatePollModalShowing && _jsx(UpdatePollModal, {})] }));
};
export default Polls;
