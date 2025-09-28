import React, { useState } from 'react';
import API_BASE_URL from '../services/api';

const FAQ = () => {
    const [formData, setFormData] = useState({ name: '', email: '', description: '' });
    const [responseMessage, setResponseMessage] = useState('');

    const faqs = [
        {
            question: "What is YourFarmy?",
            answer: "YourFarmy is an innovative platform designed to empower farmers by providing tools and resources for modern farming and direct consumer engagement.",
        },
        {
            question: "How does YourFarmy help farmers?",
            answer: "YourFarmy offers features like crop yield prediction, a farm-to-consumer direct sales network, and access to modern farming tutorials to help farmers improve productivity and profitability.",
        },
        {
            question: "Is YourFarmy free to use?",
            answer: "Yes, the platform is free for farmers to use. Some advanced features may require a subscription in the future.",
        },
        {
            question: "How can consumers benefit from YourFarmy?",
            answer: "Consumers can directly purchase fresh, high-quality products from farmers, ensuring better prices and traceability.",
        },
        {
            question: "Is YourFarmy available globally?",
            answer: "Currently, YourFarmy is focused on specific regions but plans to expand globally in the near future.",
        },
        {
            question: "How can I contact YourFarmy for support?",
            answer: "You can use the contact form on our website to reach out, or email us directly at support@yourfarmy.com.",
        },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleProblemSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_BASE_URL}/api/report-problem`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.success) {
                setResponseMessage('Your problem has been reported successfully!');
                setFormData({ name: '', email: '', description: '' });
            } else {
                setResponseMessage('Failed to report the problem. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setResponseMessage('An error occurred while reporting the problem.');
        }
    };

    return (
        <div className="relative mt-20 border-neutral-800 min-h-[800px]">
            {/* FAQ Section */}
            <div className="text-center">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
                    Frequently Asked{" "}
                    <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
                        Questions
                    </span>
                </h2>
            </div>
            <div className="mt-10 lg:mt-20 max-w-4xl mx-auto px-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="mb-8">
                        <h3 className="text-xl font-semibold text-orange-800 mb-2">
                            {faq.question}
                        </h3>
                        <p className="text-lg text-neutral-700">
                            {faq.answer}
                        </p>
                    </div>
                ))}
            </div>

            {/* Problem Reporting Section */}
            <div className="mt-20 max-w-4xl mx-auto px-4">
                <h3 className="text-2xl font-semibold text-orange-800 mb-6 text-center">
                    Report a Problem
                </h3>
                <form onSubmit={handleProblemSubmit} className="flex flex-col">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="mb-4 p-3 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        className="mb-4 p-3 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <textarea
                        name="description"
                        rows="4"
                        placeholder="Describe your problem here..."
                        className="mb-4 p-3 rounded-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                    <button
                        type="submit"
                        className="p-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800 text-white hover:from-orange-600 hover:to-orange-900 transition duration-300"
                    >
                        Submit Problem
                    </button>
                </form>
                {responseMessage && (
                    <p className="mt-4 text-center text-lg text-green-600">
                        {responseMessage}
                    </p>
                )}
            </div>
        </div>
    );
};

export default FAQ;
