import React, { useState, useEffect } from 'react';

const FarmerForm = () => {
    const [farmerCart, setFarmerCart] = useState([]);
    const [farmerName, setFarmerName] = useState('');
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productLink, setProductLink] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [location, setLocation] = useState('');

    // Fetch the farmer cart on component mount
    useEffect(() => {
        const fetchFarmerCart = async () => {
            try {
                const response = await fetch('/api/farmerCart');
                const data = await response.json();
                if (Array.isArray(data)) {
                    setFarmerCart(data);
                } else {
                    console.error("Fetched data is not an array:", data);
                }
            } catch (error) {
                console.error("Error fetching farmer cart:", error);
            }
        };

        fetchFarmerCart();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = { farmerName, productName, productDescription, productLink, contactNumber, location };

        try {
            // Logic to save the new product to the database
            await fetch('/api/uploadProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            // Update local state
            setFarmerCart(prevCart => [...prevCart, newProduct]);
            console.log('Product Uploaded:', newProduct);
            // Reset form fields
            resetFormFields();
        } catch (error) {
            console.error("Error uploading product:", error);
        }
    };

    // Function to reset form fields
    const resetFormFields = () => {
        setFarmerName('');
        setProductName('');
        setProductDescription('');
        setProductLink('');
        setContactNumber('');
        setLocation('');
    };

    // Function to handle deleting a product
    const handleDelete = async (index) => {
        const productToDelete = farmerCart[index];

        try {
            // Logic to delete the product from the database
            await fetch(`/api/deleteProduct/${productToDelete.id}`, {
                method: 'DELETE',
            });

            // Update local state
            setFarmerCart(prevCart => prevCart.filter((_, i) => i !== index));
            console.log('Product Deleted:', productToDelete);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div className='mt-20 text-center'>
            <h2 className='mb-10 text-3xl sm:text-5xl lg:text-6xl tracking-wide'>
                Upload Your Farm Product
            </h2>
            <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                <input 
                    type='text' 
                    placeholder='Farmer Name' 
                    value={farmerName} 
                    onChange={(e) => setFarmerName(e.target.value)} 
                    className='mb-4 p-2 border border-neutral-300 rounded'
                    required
                />
                <input 
                    type='text' 
                    placeholder='Product Name' 
                    value={productName} 
                    onChange={(e) => setProductName(e.target.value)} 
                    className='mb-4 p-2 border border-neutral-300 rounded'
                    required
                />
                <textarea 
                    placeholder='Product Description' 
                    value={productDescription} 
                    onChange={(e) => setProductDescription(e.target.value)} 
                    className='mb-4 p-2 border border-neutral-300 rounded'
                    required
                />
                <input 
                    type='url' 
                    placeholder='Product Link' 
                    value={productLink} 
                    onChange={(e) => setProductLink(e.target.value)} 
                    className='mb-4 p-2 border border-neutral-300 rounded'
                    required
                />
                <input 
                    type='tel' 
                    placeholder='Contact Number' 
                    value={contactNumber} 
                    onChange={(e) => setContactNumber(e.target.value)} 
                    className='mb-4 p-2 border border-neutral-300 rounded'
                    required
                />
                <input 
                    type='text' 
                    placeholder='Location' 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                    className='mb-4 p-2 border border-neutral-300 rounded'
                    required
                />
                <button 
                    type='submit' 
                    className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
                >
                    Upload Product
                </button>
            </form>
            <div className="mt-10 p-6 border rounded-lg shadow-lg ">
                <h3 className='text-xl font-bold mb-4'>Farmer Cart</h3>
                {Array.isArray(farmerCart) && farmerCart.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {farmerCart.map((item, index) => (
                            <div key={index} className='border rounded shadow p-4'>
                                <h4 className='font-bold text-lg'>{item.productName}</h4>
                                <p className='text-gray-600'>{item.productDescription}</p>
                                <a href={item.productLink} target="_blank" rel="noopener noreferrer" className='text-blue-500 underline'>View Product</a>
                                <div className="mt-4">
                                    <button 
                                        onClick={() => handleDelete(index)} 
                                        className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No products in the cart.</p>
                )}
            </div>
        </div>
    );
};

export default FarmerForm;
