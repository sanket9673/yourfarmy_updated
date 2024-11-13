import React from 'react';
import { useSetState } from 'react-use';

const initialState = {
    isLoggedIn: false,
    isLoginPending: false,
    loginError: null,
};

export const AuthContext = React.createContext(null);

export const ContextProvider = (props) => {
    const [state, setState] = useSetState(initialState);

    const setLoginPending = (isLoginPending) => setState({ isLoginPending });
    const setLoginSuccess = (isLoggedIn) => setState({ isLoggedIn });
    const setLoginError = (loginError) => setState({ loginError });

    const login = async (username, password, callback) => {
        setLoginPending(true);
        setLoginSuccess(false);
        setLoginError(null);

        try {
            const response = await fetch('http://localhost:8081/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            setLoginPending(false);
            if (data.success) {
                setLoginSuccess(true);
                if (callback) callback();  // Navigate on success
            } else {
                setLoginError(data.message);
            }
        } catch (error) {
            setLoginPending(false);
            setLoginError('An error occurred during login.');
        }
    };

    const register = async (username, password, callback) => {
        try {
            const response = await fetch('http://localhost:8081/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (data.success && callback) {
                callback();
            }
            return data;
        } catch (error) {
            return { success: false, message: 'Registration failed.' };
        }
    };

    const logout = () => {
        setState(initialState); // Reset to initial state
    };

    return (
        <AuthContext.Provider value={{ state, login, register, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

