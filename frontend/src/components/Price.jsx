import React, { useState, useEffect } from 'react';
import { pricingOptions } from '../constants';
import { CheckCircle2 } from 'lucide-react';

const Price = () => {
    const [cart, setCart] = useState(() => {
        // Initialize cart from localStorage
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    const addToCart = (item) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.title === item.title);
            const updatedCart = existingItem
                ? prevCart.map(cartItem =>
                    cartItem.title === item.title
                        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                        : cartItem
                )
                : [...prevCart, item];

            // Update localStorage
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const removeFromCart = (title) => {
        setCart(prevCart => {
            const updatedCart = prevCart.filter(cartItem => cartItem.title !== title);
            // Update localStorage
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const updateQuantity = (title, quantity) => {
        if (quantity <= 0) {
            return removeFromCart(title);
        }
        setCart(prevCart => {
            const updatedCart = prevCart.map(cartItem =>
                cartItem.title === title
                    ? { ...cartItem, quantity }
                    : cartItem
            );
            // Update localStorage
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    // Calculate total price only if cart is not empty
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    return (
        <div className='mt-20'>
            <h2 className='text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wider'>
                Store
            </h2>

            {/* Cart Display */}
            <div className='mb-10 p-6 border border-neutral-700 rounded-xl text-center'>
                <h3 className='text-2xl mb-4'>Your Cart</h3>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div>
                        <ul className='mb-4'>
                            {cart.map((item, index) => (
                                <li key={index} className='flex justify-between items-center mb-2'>
                                    <span>{item.title} (x{item.quantity}) - <span className='font-bold'>{`₹${(item.price * item.quantity).toFixed(2)}`}</span></span>
                                    <div className='flex items-center'>
                                        <button
                                            onClick={() => updateQuantity(item.title, item.quantity - 1)}
                                            className='mr-2 border border-red-600 text-red-600 rounded px-2'>
                                            -
                                        </button>
                                        <button
                                            onClick={() => updateQuantity(item.title, item.quantity + 1)}
                                            className='mr-2 border border-blue-600 text-blue-600 rounded px-2'>
                                            +
                                        </button>
                                        <button
                                            onClick={() => removeFromCart(item.title)}
                                            className='border border-neutral-400 text-neutral-400 rounded px-2'>
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className='text-lg font-bold'>
                            Total: <span className='text-xl'>₹{totalPrice}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Pricing Options */}
            <div className='flex flex-wrap'>
                {pricingOptions.map((option, index) => (
                    <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-2">
                        <div className="p-10 border border-neutral-700 rounded-xl">
                            <p className='text-3xl mb-8'>
                                {option.title}
                                {option.title === "Sickle" && (
                                    <span className='bg-gradient-to-r from-orange-500 to-red-400 text-transparent text-xl bg-clip-text mb-4 ml-2'>(Most Popular)</span>
                                )}
                            </p>
                            <p className='mb-8'>
                                <span className='text-5xl mt-6 mr-2'>{option.price}</span>
                            </p>
                            <ul>
                                {option.features.map((feature, index) => (
                                    <li key={index} className='mt-8 flex items-center'>
                                        <CheckCircle2 />
                                        <span className='ml-2'>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button 
                                onClick={(e) => {
                                    e.preventDefault(); // Prevent default button behavior
                                    addToCart({ title: option.title, price: parseFloat(option.price.replace('₹', '')), quantity: 1 });
                                }} 
                                className='inline-flex justify-center items-center text-center w-full h-12 p-5 mt-20 tracking-tight text-xl hover:bg-orange-900 border border-orange-900 rounded-lg transition duration-200'>
                                Place Your Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Price;

