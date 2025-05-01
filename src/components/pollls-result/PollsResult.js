import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from './PollsResult.module.css';
import { options } from '../../mockdata/data';
import OptionRating from '../option-rating/OptionRating';
import { useState } from 'react';
const PollsResult = ({ id, thumbnail, title }) => {
    const [totalVotes,] = useState(521);
    // Get options that belong to this poll
    const pollOptions = options.filter(option => option.pollId === id);
    return (_jsxs("article", { className: styles.resultpoll_container, children: [_jsxs("header", { className: styles.result_header, children: [_jsx("h4", { children: title }), _jsx("div", { className: styles.polls_header_img, children: _jsx("img", { src: thumbnail, alt: title }) })] }), _jsx("ul", { className: styles.polls_list, children: pollOptions.map(option => (_jsx(OptionRating, { ...option, totalVotes: totalVotes }, option.id))) })] }));
};
export default PollsResult;
