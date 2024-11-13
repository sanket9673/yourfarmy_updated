import React, { useContext, useState } from 'react';
import AuthContext from '../contexts/AuthContext'; // Use default import
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { register } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registerError, setRegisterError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await register(username, password, () => {
            navigate('/'); // Navigate to the root path after registration
        });
        if (!response.success) {
            setRegisterError(response.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-60 ml-10">
            <form onSubmit={handleSubmit} className="bg-neutral-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl mb-4">Register</h2>
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
                {registerError && <p className="text-red-500">{registerError}</p>}
                <button type="submit" className="bg-gradient-to-r from-orange-500 to-orange-800 text-white py-2 px-4 rounded-md">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
