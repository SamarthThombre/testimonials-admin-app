export interface Testimonial {
    id: string;
    userName: string;
    email: string;
    textContent: string;
    videoUrl?: string; // Optional field for video testimonials
    rating: number;
    spaceId: string;
    type: 'text' | 'video';
    createdAt: string;
    status: 'pending' | 'approved';
    isLiked: boolean;
  }