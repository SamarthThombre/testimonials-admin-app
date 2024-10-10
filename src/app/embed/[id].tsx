// // This page is used to fetch data and embed a testimonial in a website

// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';

// export default function EmbedTestimonial() {
//   const router = useRouter();
//   const { id } = router.query;
//   const [testimonial, setTestimonial] = useState(null);

//   useEffect(() => {
//     if (id) {
//       // Fetch the testimonial data from your database using the id
//       fetch(`/api/testimonials/${id}`)
//         .then(response => response.json())
//         .then(data => setTestimonial(data));
//     }
//   }, [id]);

//   const generateEmbedCode = (id) => {
//     const embedUrl = `https://testimonials-db.web.com/embed/${id}/?theme=light`;
//     const iframeCode = `<iframe src="${embedUrl}" width="100%" height="200" frameborder="0"></iframe>`;
//     return { embedUrl, iframeCode };
//   };

//   const handleApproval = (testimonialId) => {
//     // Update the testimonial's status to approved in Firestore
//     // Then generate the embed code
//     const { embedUrl, iframeCode } = generateEmbedCode(testimonialId);
    
//     // Save embedUrl and iframeCode in your database if needed
//     // Provide the embed code to the admin for use
//     console.log('Embed URL:', embedUrl);
//     console.log('Iframe Code:', iframeCode);
//   };

//   if (!testimonial) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div style={{ padding: '10px', backgroundColor: '#f8f8f8' }}>
//       <blockquote>{testimonial.content}</blockquote>
//       <p>— {testimonial.author}</p>
//       <button onClick={() => handleApproval(testimonial.id)}>Approve</button>
//     </div>
//   );
// }
