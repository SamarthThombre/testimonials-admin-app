import { db } from '../../../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// API route in Next.js to handle adding testimonials to Firestore
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, testimonial } = req.body;

    try {
      const docRef = await addDoc(collection(db, 'testimonials'), {
        name,
        email,
        testimonial,
        status: 'pending', // Default status when submitted
        createdAt: serverTimestamp(), // Automatically generate timestamp
      });

      res.status(201).json({ id: docRef.id, message: 'Testimonial added successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error adding testimonial' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
