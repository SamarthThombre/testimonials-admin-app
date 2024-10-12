import { db } from '../config/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export async function getTestimonials(spaceName: string) {
  try {
    const testimonialsRef = collection(db, 'testimonials');
    const q = query(testimonialsRef, where("spaceId", "==", spaceName));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}