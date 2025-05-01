import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import styles from './Results.module.css';
import { polls as dummyPolls } from '../../mockdata/data';
import PollsResult from '../../components/pollls-result/PollsResult';
const Results = () => {
    const [polls,] = useState(dummyPolls);
    return (_jsx("section", { className: styles.results_container, children: _jsx("div", { className: `container ${styles.results_wrapper}`, children: polls.map(poll => (_jsx(PollsResult, { ...poll }, poll.id))) }) }));
};
export default Results;
