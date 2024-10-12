import { getTestimonials } from '../../../utils/testimonials';
import { Testimonial } from '@/interfaces/Testimonial';
import Script from 'next/script';
import './embed.css';

export const dynamic = 'force-dynamic'; // or 'auto' if you want Next.js to decide

export default async function EmbedPage({ params, searchParams }: { 
  params: { spaceName: string }, 
  searchParams: { theme?: string, initialCount?: string } 
}) {
  const { spaceName } = params;
  const { theme = 'light', initialCount = '20' } = searchParams;
  
  let testimonials: Testimonial[] = [];
  let error = null;

  try {
    testimonials = await getTestimonials(spaceName) as Testimonial[];
    console.log('Fetched testimonials:', testimonials);
    // Filter testimonials to only include those with isLiked set to true
    testimonials = testimonials.filter(testimonial => testimonial.isLiked);
  } catch (err) {
    console.error('Error fetching testimonials:', err);
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  const displayCount = Math.min(parseInt(initialCount), testimonials.length);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{`Wall of Fame - ${spaceName}`}</title>
        <Script src="localhost:3000/js/iframe-resizer.child.js" strategy="afterInteractive" />
      </head>
      <body className={theme === 'light' ? 'light-theme' : 'dark-theme'}>
        {error && <p className="error">Error: {error}</p>}
        {testimonials.length === 0 && !error && <p>No testimonials found for this space.</p>}
        <div id="testimonials-container">
          {testimonials.slice(0, displayCount).map((testimonial: Testimonial) => (
            <div key={testimonial.id} className="testimonial">
              <div className="testimonial-header">
                <div className="testimonial-avatar">
                  {testimonial.userName.charAt(0).toUpperCase()}
                </div>
                <div className="testimonial-author">{testimonial.userName}</div>
              </div>
              <div className="text-yellow-500 mb-2">{'★'.repeat(testimonial.rating)}</div>
              <div className="testimonial-content">{testimonial.textContent}</div>
              <div className="testimonial-date">{testimonial.createdAt}</div>
            </div>
          ))}
        </div>
      </body>
    </html>
  );
}