// API route to fetch testimonials from firebase for displaying them in the admin dashboard

import { db } from '../../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const querySnapshot = await getDocs(collection(db, 'testimonials'));
      const testimonials = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.status(200).json(testimonials);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching testimonials' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
