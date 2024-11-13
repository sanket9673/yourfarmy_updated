import React from 'react' ;
import { features } from '../constants';
import { loans } from '../constants';

const FeatureSection = () => {
  return (
    <div className='relative mt-20 border-neutral-800 min-h-[800px]'>
        <div className="text-center">
            <span className='bg-neutral-900 text-orange-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase'>Loan Inquiry</span>
            <h2 className='text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide'>Quick Inquiry
                <span className='bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text'> about loans available</span>
            </h2>
        </div>    
        <div className="flex flex-wrap mt-10 lg:mt-20">
            {features.map((feature, index) => (
                <div key={index} className='w-full sm:1/2 lg:w-1/3'>
                    <div className="flex">
                        <div className="flec mx-6 h-10 w-10 p-2 bg-neutral-900 text-orange-700 justify-center
                        items-center rounded-full">
                            {feature.icon}
                        </div>
                        <div className="div">
                            <h5 className='mt-1 mb-6 text-xl'>{feature.text}</h5>
                            <div className="text-md p-2 mb-20 text-neutral-500">{feature.description}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div> 
        <div className="mt-20 lg:mt-30">
            <h3 className='text-2xl sm:text-4xl lg:text-5xl mb-6 tracking-wide text-center'>
                Available <span className='bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text'>Loans</span>
            </h3>
            <div className="flex flex-wrap justify-center">
                {loans.map((loan, index) => (
                    <div key={index} className='w-full sm:w-1/2 lg:w-1/3 mb-10 px-4'>
                        <div className="bg-neutral-900 p-6 rounded-lg shadow-md h-full text-center">
                            <h4 className='text-xl text-orange-500 mb-4'>{loan.name}</h4>
                            <p className="text-md text-neutral-300 mb-6">{loan.description}</p>
                            <a 
                                href={loan.link} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="inline-block px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-800 text-white rounded-md hover:from-orange-600 hover:to-orange-900 transition duration-300"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div> 
    </div>
  )
}

export default FeatureSection ;
