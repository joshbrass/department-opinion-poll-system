import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './ConfirmVoteModal.module.css';
import { options } from '../../../mockdata/data';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks/reduxHooks';
const ConfirmVoteModal = ({ opinionId, onCancel, onConfirm }) => {
    const [modalOpinion, setModalOpinion] = useState(null);
    const currentVoter = useAppSelector((state) => state.vote.currentVoter); // Updated hook
    useEffect(() => {
        const selectedOpinion = options.find(opinion => opinion.id === opinionId);
        if (selectedOpinion) {
            setModalOpinion(selectedOpinion);
        }
    }, [opinionId]);
    return (_jsx("section", { className: "modal", children: _jsxs("div", { className: `${styles.confirm_vote_content} modal_content`, children: [_jsx("h5", { children: "Please confirm your vote" }), currentVoter.isAdmin && (_jsx("p", { className: styles.adminNote, children: "(Admin voting mode)" })), _jsx("h2", { children: modalOpinion?.answer }), _jsxs("div", { className: styles.confirm_vote_cta, children: [_jsx("button", { className: "btn", onClick: onCancel, children: "Cancel" }), _jsx("button", { className: "btn primary", onClick: () => modalOpinion && onConfirm(modalOpinion), children: "Confirm" })] })] }) }));
};
export default ConfirmVoteModal;
