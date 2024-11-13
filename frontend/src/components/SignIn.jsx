import React, { useContext, useState } from 'react';
import AuthContext from '../contexts/AuthContext'; // Use default import
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const { state, login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        login(username, password, () => {
            navigate('/'); // Redirect to HeroSection on success
        });
    };

    return (
        <div className="flex justify-center items-center min-h-60 ml-10">
            <form onSubmit={handleSubmit} className="bg-neutral-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl mb-4">Sign In</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full mb-3 p-2 border rounded-md"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full mb-4 p-2 border rounded-md"
                    required
                />
                {state.loginError && <p className="text-red-500">{state.loginError}</p>}
                <button type="submit" className="bg-gradient-to-r from-orange-500 to-orange-800 text-white py-2 px-4 rounded-md">
                    {state.isLoginPending ? 'Signing in...' : 'Sign In'}
                </button>
            </form>
        </div>
    );
};

export default SignIn;
