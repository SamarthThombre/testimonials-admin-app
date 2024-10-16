/* eslint-disable */
// API route to fetch testimonials spcific to a space from firebase for displaying them in the admin dashboard
import { db } from '@/config/firebaseConfig';
import { getTestimonials } from '@/utils/testimonials';
import { doc, updateDoc } from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { spaceName: string } }) {
  const { spaceName } = params;
  if (!spaceName) {
    return NextResponse.json({ error: 'Space name is required' }, { status: 400 });
  }
  try {
    const testimonials = await getTestimonials(spaceName);
    console.log('Fetched testimonials:', testimonials);
    return NextResponse.json(testimonials, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/testimonials/[spaceId]:', error);
    return NextResponse.json({ error: 'Error fetching testimonials' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const { testimonialId, isLiked } = await request.json();

  try {
    const testimonialRef = doc(db, 'testimonials', testimonialId);
    await updateDoc(testimonialRef, { isLiked });

    return NextResponse.json({ message: 'Testimonial updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error in PATCH /api/testimonials/[spaceId]:', error);
    return NextResponse.json({ error: 'Error updating testimonial' }, { status: 500 });
  }
}