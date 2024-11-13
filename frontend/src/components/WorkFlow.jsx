import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import organicImg from "../assets/organic.jpg";
import { listItems, products } from '../constants'; // Importing checklist items and products

const WorkFlow = () => {
  return (
    <div className='mt-20'>
        <h2 className='mb-20 text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide'>
            Connect Farmers with 
            <span className='bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text'> Direct Consumers</span>
        </h2>
        <p className='text-center mb-10 text-md text-neutral-600'>
            Farmers can directly sell their fresh farm products to consumers, ensuring quality and freshness.
        </p>
        <div className='flex flex-wrap justify-center'>
            <div className="p-2 w-full lg:w-1/2">
                <img src={organicImg} alt="Fresh Products" />
            </div>
            <div className="pt-12 w-full lg:w-1/2">
                {listItems.map((items, index) => (
                    <div key={index} className='flex mb-12'>
                        <div className="text-green-400 mx-6 bg-neutral-900 h-10 w-10 p-2 justify-center items-center rounded-full">
                            <CheckCircle2 />
                        </div>
                        <div className="">
                            <h5 className='mt-1 mb-2 text-xl'>{items.title}</h5>
                            <p className='text-md text-neutral-500'>{items.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* New Farmer-Consumer Product Section */}
        <h2 className='mb-10 text-3xl sm:text-5xl lg:text-6xl text-center mt-20 tracking-wide'>
            Available Farm Products
        </h2>
        <div className='flex flex-wrap justify-center'>
            {products.map((product, index) => (
                <div key={index} className='p-4 w-full sm:w-1/2 lg:w-1/3'>
                    <div className='border rounded-md shadow-lg p-4 text-center'>
                        <img src={product.image} alt={product.name} className='w-full h-48 object-cover rounded-md' />
                        <h3 className='text-lg font-semibold mt-2'>{product.name}</h3>
                        <p className='text-gray-600 mb-2'>{product.description}</p>
                        <p className='text-orange-500 font-bold'>{product.price}</p>
                        <p className='text-sm text-gray-700 mt-1'>Farmer: {product.farmerName}</p>
                        <p className='text-sm text-gray-700'>Contact: {product.contact}</p>
                        <p className='text-sm text-gray-700'>Location: {product.area}</p>
                        <p className='text-sm text-yellow-500'>Rating: {product.rating}⭐</p>
                        <button className='bg-green-500 text-white mt-4 px-4 py-2 rounded hover:bg-green-600'>Buy</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}

export default WorkFlow;
