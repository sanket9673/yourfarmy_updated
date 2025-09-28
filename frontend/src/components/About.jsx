import React, { useState } from 'react';
import API_BASE_URL from '../services/api';

const About = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [responseMessage, setResponseMessage] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_BASE_URL}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.success) {
                setResponseMessage('Message sent successfully!');
                setFormData({ name: '', email: '', message: '' }); // Clear form
            } else {
                setResponseMessage('Failed to send message.');
            }
        } catch (error) {
            console.error('Error:', error);
            setResponseMessage('An error occurred while sending the message.');
        }
    };

    return (
        <div className='relative mt-20 border-neutral-800 min-h-[800px]'>
            <div className="text-center">
                <h2 className='text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide'>
                    Welcome to <span className='bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text'>YourFarmy</span>
                </h2>
            </div>    
            <div className="flex flex-col items-center mt-10 lg:mt-20">
                <p className="text-lg mb-4 text-center max-w-2xl">
                    We’re committed to empowering farmers and connecting 
                    communities through innovative tools and resources. Our mission is to make modern farming accessible and profitable for everyone.
                </p>
                <p className="text-lg mb-4 text-center max-w-2xl">
                    With a team dedicated to supporting farmers, we focus on sustainable growth and community engagement. 
                    We believe in the power of technology to transform agriculture and improve lives.
                </p>
                <p className="text-lg mb-4 text-center max-w-2xl">
                    Join us in cultivating a brighter, connected future in farming!
                </p>
            </div>

            <div className="flex flex-col items-center mt-20 lg:mt-32">
                <h3 className='text-2xl sm:text-4xl lg:text-5xl mb-6 tracking-wide'>
                    Contact <span className='bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text'>Us</span>
                </h3>
                <p className="text-lg mb-8 text-center max-w-2xl">
                    Have questions or want to connect? We'd love to hear from you!
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md">
                    <input 
                        type="text" 
                        name="name"
                        placeholder="Your Name" 
                        className="mb-4 p-3 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Your Email" 
                        className="mb-4 p-3 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <textarea 
                        name="message"
                        placeholder="Your Message" 
                        rows="4"
                        className="mb-4 p-3 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={formData.message}
                        onChange={handleChange}
                    ></textarea>
                    <button 
                        type="submit" 
                        className="p-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800 text-white hover:from-orange-600 hover:to-orange-900 transition duration-300"
                    >
                        Send Message
                    </button>
                </form>
                {responseMessage && <p className="mt-4">{responseMessage}</p>}
            </div>
        </div>
    );
};

export default About;
