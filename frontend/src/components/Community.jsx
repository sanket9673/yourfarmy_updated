import React, { useState } from 'react';

const Community = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [responseMessage, setResponseMessage] = useState('');

    const videos = [
        {
            title: "Introduction to Modern Farming",
            description: "Learn the basics of modern farming techniques to increase productivity and sustainability.",
            link: "https://www.youtube.com/watch?v=OTbn_gXfb2A",
            image: "https://www.farmerscion.com/wp-content/uploads/2021/10/Modern-Agriculture-Farmer-Scion.jpg",
        },
        {
            title: "Soil Health and Fertility",
            description: "Understand the importance of soil health and how to improve it for better crop yields.",
            link: "https://www.youtube.com/watch?v=OcEuG-NzmqQ",
            image: "https://cropaia.com/wp-content/uploads/Soil-fertility.jpg",
        },
        {
            title: "Crop Rotation and Pest Management",
            description: "Explore methods for effective crop rotation and integrated pest management.",
            link: "https://www.youtube.com/watch?v=1wMOP-mBmXo",
            image: "https://usfarmersandranchers.org/wp-content/uploads/2020/06/benefits-of-crop-rotation-hero.jpg",
        },
        {
            title: "Irrigation Systems for Small Farms",
            description: "Learn how to implement efficient irrigation systems for small-scale farming operations.",
            link: "https://www.youtube.com/watch?v=3w5j9B-kY7o",
            image: "https://d27p2a3djqwgnt.cloudfront.net/wp-content/uploads/2018/06/05120124/water-sprinklers-880970_1280.jpg",
        },
        {
            title: "Sustainable Farming Practices",
            description: "Learn about sustainable farming practices that protect the environment while increasing profits.",
            link: "https://www.youtube.com/watch?v=iloAQmroRK0",
            image: "https://assets.weforum.org/article/image/WxZnPfCh3elRtPyzhRY9XyAi6L9J8DKPjYq_-FUVEtA.JPG",
        },
        {
            title: "Organic Farming Techniques",
            description: "Discover the benefits and methods of organic farming for healthier crops and a greener planet.",
            link: "https://www.youtube.com/watch?v=K6PCFo1DR8U",
            image: "https://img.khetivyapar.com/images/blogs/1702368660-organic-plant-vegetables.jpg",
        },
    ];

    return (
        <div className="relative mt-20 border-neutral-800 min-h-[800px]">
            {/* Video Section */}
            <div className="text-center">
                <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
                    Learning Agricultural{" "}
                    <span className="bg-gradient-to-r from-green-500 to-green-800 text-transparent bg-clip-text">
                        Videos
                    </span>
                </h2>
            </div>
            <div className="mt-10 lg:mt-20 max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map((video, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105">
                        <img
                            src={video.image}
                            alt={video.title}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-green-800 mb-2">
                                {video.title}
                            </h3>
                            <p className="text-sm text-neutral-600 mb-4">
                                {video.description}
                            </p>
                            <a
                                href={video.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg transition duration-300"
                            >
                                Watch Video
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Community;
