import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import styles from "./OptionsPage.module.css";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { options as dummyOptions } from "../../mockdata/data";
import Option from "../../components/option/Option";
import ConfirmVoteModal from "../../components/modals/confirm-vote-modal/ConfirmVoteModal";
import { voteActions } from "../../store/slices/vote-slice";
import { UiActions } from "../../store/slices/ui-slice";
const OptionsPage = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    // Get state from Redux store
    const { selectedVoterOption, } = useAppSelector((state) => state.vote);
    const { voteOpinionModalShowing } = useAppSelector((state) => state.ui);
    const filteredOptions = dummyOptions.filter((option) => option.pollId === id);
    const handleVoteClick = (opinionId) => {
        dispatch(voteActions.changeSelectedVoteOption(opinionId));
        dispatch(voteActions.changeSelectedPoll(id || ''));
        dispatch(UiActions.openVoteOpinionModal());
    };
    const handleCancel = () => {
        dispatch(UiActions.closeVoteOpinionModal());
        dispatch(voteActions.changeSelectedVoteOption(''));
    };
    const handleConfirm = (opinion) => {
        console.log("Vote confirmed for:", opinion);
        dispatch(UiActions.closeVoteOpinionModal());
        dispatch(voteActions.changeSelectedVoteOption(''));
    };
    return (_jsxs(_Fragment, { children: [_jsxs("section", { className: styles.options, children: [_jsxs("header", { className: styles.options_header, children: [_jsx("h1", { children: "What's your opinion?" }), _jsx("p", { children: "These are the options for the selected poll. Please vote once, because you won't be allowed to vote on this poll again." })] }), _jsx("div", { className: styles.opinion_container, children: filteredOptions.map((option) => (_jsx(Option, { ...option, onVoteClick: () => handleVoteClick(option.id) }, option.id))) })] }), voteOpinionModalShowing && selectedVoterOption && (_jsx(ConfirmVoteModal, { opinionId: selectedVoterOption, onCancel: handleCancel, onConfirm: handleConfirm }))] }));
};
export default OptionsPage;
