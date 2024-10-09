import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function EmbedTestimonial() {
  const router = useRouter();
  const { id } = router.query;
  const [testimonial, setTestimonial] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch the testimonial data from your database using the id
      fetch(`/api/testimonials/${id}`)
        .then(response => response.json())
        .then(data => setTestimonial(data));
    }
  }, [id]);

  if (!testimonial) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: '10px', backgroundColor: '#f8f8f8' }}>
      <blockquote>{testimonial.content}</blockquote>
      <p>— {testimonial.author}</p>
    </div>
  );
}
