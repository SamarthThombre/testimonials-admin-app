'use client';

import { useState } from 'react';
import Link from 'next/link';
import TestimonialForm from '../components/TestimonialForm';
import SpaceCard from '../components/SpaceCard';
import Navbar from '../components/Navbar';

interface Space {
  headerTitle: string;
}

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [spaces, setSpaces] = useState<Space[]>([]);

  const handleFormSubmit = (formData: Space) => {
    setSpaces([...spaces, { headerTitle: formData.headerTitle }]);
    setShowForm(false);
  };

  return (
    <>
      {!showForm && <Navbar />}
      <div className="flex flex-col items-center justify-between p-10">
        {!showForm ? (
          <>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-8"
            >
              Create a new space
            </button>
            {spaces.length > 0 && (
              <div className="w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-4">Spaces</h2>
                {spaces.map((space, index) => (
                  <Link key={index} href={`/products/${encodeURIComponent(space.headerTitle)}`}>
                    <SpaceCard headerTitle={space.headerTitle} />
                  </Link>
                ))}
              </div>
            )}
          </>
        ) : (
          <TestimonialForm onSubmit={handleFormSubmit} />
        )}
      </div>
    </>
  );
}