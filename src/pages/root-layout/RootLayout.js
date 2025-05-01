import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Navbar from '../../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
const RootLayout = () => {
    return (_jsxs("div", { children: [_jsx(Navbar, {}), _jsx(Outlet, {})] }));
};
export default RootLayout;
