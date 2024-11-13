import React from 'react';
import { resourcesLinks, platformLinks, communityLinks } from '../constants';

const FooterSection = () => {
  return (
    <footer className='mt-10 border-t py-10 border-neutral-700'>
      {/* Responsive grid with gap between columns and rows */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-48 px-4 sm:px-8 lg:px-96'>

        {/* Resources Column */}
        <div>
          <h3 className='text-lg font-semibold mb-4 text-white'>Resources</h3>
          <ul className='space-y-2'>
            {resourcesLinks.map((link, index) => (
              <li key={index}>
                <a className="text-neutral-300 hover:text-white transition-all duration-200 ease-in-out" href={link.href}>
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Platform Column */}
        <div>
          <h3 className='text-lg font-semibold mb-4 text-white'>Platform</h3>
          <ul className='space-y-2'>
            {platformLinks.map((link, index) => (
              <li key={index}>
                <a className="text-neutral-300 hover:text-white transition-all duration-200 ease-in-out" href={link.href}>
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Community Column */}
        <div>
          <h3 className='text-lg font-semibold mb-4 text-white'>Community</h3>
          <ul className='space-y-2'>
            {communityLinks.map((link, index) => (
              <li key={index}>
                <a className="text-neutral-300 hover:text-white transition-all duration-200 ease-in-out" href={link.href}>
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
