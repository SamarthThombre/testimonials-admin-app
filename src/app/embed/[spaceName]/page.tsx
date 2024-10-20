'use client';

import { useEffect, useState } from 'react';
import { Testimonial } from '../../../interfaces/Testimonial';
import { useParams } from 'next/navigation';
import { FaStar } from 'react-icons/fa';
import './embed.css'; // Import the CSS file

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
      <div className="testimonial-container">
        {likedTestimonials.map((testimonial: Testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <div className="testimonial-header">
              <div className="avatar">{testimonial.userName.charAt(0).toUpperCase()}</div>
              <div className="user-info">
                <h3 className="user-name">{testimonial.userName}</h3>
                <div className="star-rating">{renderStars(testimonial.rating)}</div>
              </div>
            </div>
            <p style={{ fontStyle: 'italic', color: '#333' }}>{testimonial.textContent}</p>
            <p style={{ color: '#666', fontSize: '0.9em', textAlign: 'right' }}>
              {new Date(testimonial.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmbedPage;
