import { db } from '../config/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export async function getTestimonials(spaceName: string) {
  try {
    const testimonialsRef = collection(db, 'testimonials');
    const q = query(testimonialsRef, where("spaceId", "==", spaceName));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log('No testimonials found for this space');
      return [];
    }

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
}
