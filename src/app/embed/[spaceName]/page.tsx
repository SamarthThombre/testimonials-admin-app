import { getTestimonials } from '../../../utils/testimonials';
import { Testimonial } from '@/interfaces/Testimonial';
import EmbeddedTestimonials from './EmbeddedTestimonials';

export const dynamic = 'force-dynamic';

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
      </head>
      <body className={theme === 'light' ? 'light-theme' : 'dark-theme'}>
        <EmbeddedTestimonials 
          error={error}
          testimonials={testimonials.slice(0, displayCount)}
          spaceName={spaceName}
        />
      </body>
    </html>
  );
}