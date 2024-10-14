'use client';

import { useState, useEffect, useCallback } from 'react';
import Navbar from '../../../components/Navbar';
import WallOfLoveModal from '../../../components/WallOfFameModal';
import { FaHeart, FaRegHeart, FaStar, FaRegStar } from 'react-icons/fa';
import { Testimonial } from '@/interfaces/Testimonial';

export default function ProductPage({ params }: { params: { spaceName: string } }) {
  const spaceName = decodeURIComponent(params.spaceName);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  const fetchTestimonials = useCallback(async () => {
    try {
      const response = await fetch(`/api/testimonials/${encodeURIComponent(spaceName)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        setTestimonials(data);
      } else {
        console.error('Failed to fetch testimonials');
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  }, [spaceName]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showNotification) {
      timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showNotification]);

  const handleHeartClick = async (testimonialId: string) => {
    const testimonial = testimonials.find(t => t.id === testimonialId);
    if (testimonial) {
      const newIsLiked = !testimonial.isLiked;
      try {
        const response = await fetch(`/api/testimonials/${encodeURIComponent(spaceName)}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ testimonialId, isLiked: newIsLiked }),
        });
  
        if (response.ok) {
          setTestimonials(prevTestimonials =>
            prevTestimonials.map(t =>
              t.id === testimonialId ? { ...t, isLiked: newIsLiked } : t
            )
          );
          const message = newIsLiked
            ? "Added to Wall of Love successfully"
            : "Removed from Wall of Love successfully";
          setNotificationMessage(message);
          setShowNotification(true);
        } else {
          console.error('Failed to update testimonial');
      }
    } catch (error) {
      console.error('Error updating testimonial:', error);
    }
  }
};

  const handleWallOfLoveClick = () => {
    setIsModalOpen(true);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      index < rating ? <FaStar key={index} className="text-yellow-500 inline" /> : <FaRegStar key={index} className="text-yellow-500 inline" />
    ));
  };

  return (
    <>
    <Navbar />
    <div className="bg-gray-900 text-white min-h-screen">
    {/* Notification */}
    {showNotification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 transition-opacity duration-500">
            {notificationMessage}
          </div>
        )}

      {/* Main content */}
      <div className="container mx-auto p-4">
        {/* space title and info */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{spaceName}</h1>
            <p className="text-gray-400">Space public URL: {process.env.NEXT_PUBLIC_PRODUCTION_URL}/{spaceName.toLowerCase().replace(/\s+/g, '-')}</p>
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
             {/* Testimonial cards */}
          {testimonials.filter(t => 
            t.textContent.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.email.toLowerCase().includes(searchQuery.toLowerCase())
          ).map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-800 p-4 rounded mb-4">
              <div className="flex justify-between items-start mb-2">
                <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">
                  {testimonial.type}
                </span>
                <button 
                  className={`text-2xl ${testimonial.isLiked ? 'text-red-500' : 'text-white'}`} 
                  onClick={() => handleHeartClick(testimonial.id)}
                >
                  {testimonial.isLiked ? <FaHeart /> : <FaRegHeart />}
                </button>              
              </div>
              <div className="mb-2">{renderStars(testimonial.rating)}</div>
              <p className="mb-4">{testimonial.textContent}</p>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                <div>
                  <p>Name</p>
                  <p>{testimonial.userName}</p>
                </div>
                <div>
                  <p>Email</p>
                  <p>{testimonial.email}</p>
                </div>
                <div>
                  <p>Submitted At</p>
                  <p>{new Date(testimonial.createdAt).toLocaleString().split(',')[0]}</p>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
    <WallOfLoveModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} spaceName={spaceName}/>
    </>
  );
}