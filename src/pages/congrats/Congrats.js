import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import styles from './Congrats.module.css';
const Congrats = () => {
    return (_jsx("section", { className: styles.congrats, children: _jsxs("div", { className: `container ${styles.congrats_container}`, children: [_jsx("h2", { children: "Thanks for your vote!" }), _jsx("p", { children: "Your vote is now added to the poll's vote count. you will be redirected shortly to see the new result." }), _jsx(Link, { to: '/results', className: "btn sm primary", children: "See Results" })] }) }));
};
export default Congrats;
