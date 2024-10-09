'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import WallOfLoveModal from '../../components/WallOfFameModal';

export default function ProductPage({ params }) {
  const productTitle = decodeURIComponent(params.product_title);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let timer;
    if (showNotification) {
      timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showNotification]);

  const handleHeartClick = () => {
    setShowNotification(true);
  };

  const handleWallOfLoveClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
    <Navbar />
    <div className="bg-gray-900 text-white min-h-screen">
    {/* Notification */}
    {showNotification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 transition-opacity duration-500">
            Added to the Wall of Fame Successfully
          </div>
        )}

      {/* Main content */}
      <div className="container mx-auto p-4">
        {/* Product title and info */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{productTitle}</h1>
            <p className="text-gray-400">Space public URL: https://testimonial.to/{productTitle.toLowerCase().replace(/\s+/g, '-')}</p>
          </div>
           <div className="flex space-x-4">
            <button className="bg-gray-700 px-4 py-2 rounded">Edit Space</button>
           {/* <div className="text-center">
              <p className="font-bold">Video credits</p>
              <p>0</p>
            </div>
            <div className="text-center">
              <p className="font-bold">Text credits</p>
              <p>10</p>
            </div>
            */}
          </div> 
          
        </div>
        <hr></hr>
            
        {/* Main grid */}
        <div className="grid grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="col-span-1">
            {/* <h2 className="font-bold mb-2">INBOX</h2>
            <ul className="space-y-2">
              <li className="flex items-center"><span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span> All</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span> Video</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span> Text</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span> Archived</li>
              <li className="flex items-center"><span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span> Liked</li>
            </ul> */}
            <h2 className="font-bold mt-6 mb-2">INTEGRATIONS</h2>
            <p>Social media</p>

            <h2 className="font-bold mt-6 mb-2">EMBEDS AND METRICS</h2>
            <button 
                className="text-left hover:text-blue-500 transition-colors"
                onClick={handleWallOfLoveClick}
              >
                Wall of Fame
              </button>
          </div>

          {/* Main content area */}
          <div className="col-span-3">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by name, email, or testimonial keywords"
                className="w-full p-2 bg-gray-800 rounded"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center mb-4">
              <div></div>
              <button className="bg-gray-700 px-4 py-2 rounded">Options ▼</button>
            </div>
            {/* Testimonial card */}
            <div className="bg-gray-800 p-4 rounded">
              <div className="flex justify-between items-start mb-2">
                <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">Text</span>
                  <button className="text-red-500" onClick={handleHeartClick}>♥</button>
              </div>
              <div className="text-yellow-500 mb-2">★★★★★</div>
              <p className="mb-4">Amazing website. Loved the UX, very smooth learning. 10/10 from my side. Buy cohort 3.0</p>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                <div>
                  <p>Name</p>
                  <p>harkirat</p>
                </div>
                <div>
                  <p>Email</p>
                  <p>harkirat.litr@gmail.com</p>
                </div>
                <div>
                  <p>Submitted At</p>
                  <p>Jul 4, 2024, 10:14:28 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <WallOfLoveModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}