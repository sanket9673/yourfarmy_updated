import React, { useState } from 'react';
import Markdown from 'react-markdown'

const Testimonials = () => {
    const [chatInput, setChatInput] = useState("");
    const [chatMessages, setChatMessages] = useState([]);

    // Function to handle chat messages
    const handleSendMessage = async () => {
        if (!chatInput) return;

        // Append user message to chat
        const userMessage = { role: 'user', content: chatInput };
        setChatMessages([...chatMessages, userMessage]);

        try {
            // Send user message to server
            const response = await fetch("http://localhost:8081/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: chatInput }),
            });
            const data = await response.json();
            
            // Append bot response to chat
            const botMessage = { role: 'bot', content: data.reply };
            setChatMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
        }

        // Clear the chat input field
        setChatInput("");
    };

    return (
        <div className='mt-20 tracking-wide'>
            <h2 className='text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20'>ChatBot</h2>

            <div className="chat-box bg-neutral rounded-md p-6 text-md border border-neutral-800 font-thin mb-4">
                {chatMessages.map((message, index) => (
                    <div key={index} className={message.role === 'user' ? 'text-right' : 'text-left'}>
                        <p><strong>{message.role === 'user' ? 'You' : 'Bot'}:</strong> {message.role === 'user' ? message.content : (<Markdown>{message.content}</Markdown>)}</p>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-center mb-4">
                <input
                    type="text"
                    className="border border-neutral-800 p-2 rounded w-full sm:w-2/3 lg:w-1/2"
                    placeholder="Type your message..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                />
                <button
                    className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={handleSendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Testimonials;


