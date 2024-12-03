import PropTypes from "prop-types";
import { createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const authData = {};
    return (
        <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
