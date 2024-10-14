'use client';

import { Testimonial } from '@/interfaces/Testimonial';
import { FaRegStar, FaStar } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import './embed.css';

const IframeResizer = dynamic(() => import('@iframe-resizer/react'), { ssr: false });

interface EmbeddedTestimonialsProps {
  error: string | null;
  testimonials: Testimonial[];
  spaceName: string;
}

export default function EmbeddedTestimonials({ error, testimonials, spaceName }: EmbeddedTestimonialsProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      index < rating ? <FaStar key={index} className="text-yellow-500 inline" /> : <FaRegStar key={index} className="text-yellow-500 inline" />
    ));
  };

  const content = (
    <>
      {error && <p className="error">Error: {error}</p>}
      {testimonials.length === 0 && !error && <p>No testimonials found for this space.</p>}
      <div id="testimonials-container">
        {testimonials.map((testimonial: Testimonial) => (
          <div key={testimonial.id} className="testimonial">
            <div className="testimonial-header">
              <div className="testimonial-avatar">
                {testimonial.userName.charAt(0).toUpperCase()}
              </div>
              <div className="testimonial-author">{testimonial.userName}</div>
            </div>
            <div className="text-yellow-500 mb-2">{renderStars(testimonial.rating)}</div>
            <div className="testimonial-content">{testimonial.textContent}</div>
            <div className="testimonial-date">{testimonial.createdAt}</div>
          </div>
        ))}
      </div>
    </>
  );

  if (!isClient) {
    return content;
  }

  return (
    <IframeResizer
      license=''
      checkOrigin={false}
      onResized={(event) => {
        console.log(`Iframe resized to ${event.height}px height and ${event.width}px width`);
      }}
      scrolling={false}
      style={{ width: '1px', minWidth: '100%' }}
    >
      {content}
    </IframeResizer>
  );
}