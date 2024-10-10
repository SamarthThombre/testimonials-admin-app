// API route to fetch testimonials spcific to a space from firebase for displaying them in the admin dashboard
import { db } from '../../../../config/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { spaceName: string } }) {
  const { spaceName } = params;
  try {
    const testimonialsRef = collection(db, 'testimonials');
    const q = query(testimonialsRef, where("spaceId", "==", spaceName));
    const querySnapshot = await getDocs(q);
    
    const testimonials = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log('Fetched testimonials:', testimonials);
    return NextResponse.json(testimonials, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/testimonials/[spaceId]:', error);
    return NextResponse.json({ error: 'Error fetching testimonials' }, { status: 500 });
  }
}