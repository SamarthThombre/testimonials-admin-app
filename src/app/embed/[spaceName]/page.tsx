'use client';

import { useEffect, useState } from 'react';
import { Testimonial } from '../../../interfaces/Testimonial';
import { useParams } from 'next/navigation';
import { FaStar } from 'react-icons/fa';

const EmbedPage = () => {
  const [likedTestimonials, setLikedTestimonials] = useState<Testimonial[]>([]);
  const params = useParams();
  const spaceName = params.spaceName as string;

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`/api/testimonials/${spaceName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        const data = await response.json();
        setLikedTestimonials(data.filter((testimonial: Testimonial) => testimonial.isLiked));
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };
    fetchTestimonials();
  }, [spaceName]);

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'} />
    ));
  };

  return (
    <div className="embed-container">
      {likedTestimonials.map((testimonial: Testimonial) => (
        <div key={testimonial.id} className="testimonial-card">
          <div className="testimonial-header">
            <div className="avatar">{testimonial.userName.charAt(0).toUpperCase()}</div>
            <div className="user-info">
              <h3 className="user-name">{testimonial.userName}</h3>
              <div className="star-rating">{renderStars(testimonial.rating)}</div>
            </div>
          </div>
          <blockquote className="testimonial-content">{testimonial.textContent}</blockquote>
          <p className="testimonial-date">{new Date(testimonial.createdAt).toLocaleDateString()}</p>
        </div>
      ))}
      <style jsx>{`
        .embed-container {
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: auto;
          background: #fff;
        }
        .testimonial-card {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 16px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .testimonial-header {
          display: flex;
          align-items: center;
          margin-bottom: 12px;
        }
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #6366f1;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin-right: 12px;
        }
        .user-info {
          display: flex;
          flex-direction: column;
        }
        .user-name {
          font-weight: bold;
          margin: 0;
        }
        .star-rating {
          display: flex;
          margin-top: 4px;
        }
        .testimonial-content {
          font-style: italic;
          color: #333;
          margin-bottom: 12px;
        }
        .testimonial-date {
          color: #666;
          font-size: 0.9em;
          text-align: right;
          margin: 0;
        }
        @media (max-width: 600px) {
          .embed-container {
            max-width: 90%;
          }
        }
      `}</style>
    </div>
  );
};

export default EmbedPage;
