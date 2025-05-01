import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PollsList.module.css';
import { polls as dummyPolls } from '../../mockdata/data';
const PollsList = () => {
    const [polls] = useState(dummyPolls);
    const navigate = useNavigate();
    return (_jsx("section", { className: styles.polls_container, children: _jsxs("div", { className: `container ${styles.polls_wrapper}`, children: [_jsx("h2", { children: "Available Polls" }), polls.map(poll => (_jsxs("div", { className: styles.poll_card, children: [_jsx("h3", { children: poll.title }), _jsx("p", { children: poll.description }), poll.thumbnail && (_jsx("img", { src: poll.thumbnail, alt: poll.title, className: styles.thumbnail })), _jsx("button", { onClick: () => navigate(`/polls/${poll.id}/option`), className: styles.vote_button, children: "Vote Now" })] }, poll.id)))] }) }));
};
export default PollsList;
