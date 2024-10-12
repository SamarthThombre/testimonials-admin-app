'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import TestimonialForm from '../../components/TestimonialForm';
import SpaceCard from '../../components/SpaceCard';
import Navbar from '../../components/Navbar';
import { addSpace, getSpaces } from '../../config/firebaseConfig';
import { DocumentData } from 'firebase/firestore';

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [spaces, setSpaces] = useState([{id: '', spaceName: ''}]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSpaces();
  }, []);

  const fetchSpaces = async () => {
    try {
      setLoading(true);
      const fetchedSpaces = await getSpaces();
      console.log(fetchedSpaces);
      setSpaces(fetchedSpaces);
    } catch (error) {
      console.error('Error fetching spaces:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async(formData: DocumentData) => {
    try {
      await addSpace(formData);
      await fetchSpaces(); // Refresh the spaces list
      setShowForm(false);
    } catch (error) {
      console.error('Error adding space:', error);
      // Handle error (e.g., show error message to user)
    }
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
            {loading ? (
              <p>Loading spaces...</p>
            ) : spaces.length > 0 ? (
              <div className="w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-4">Spaces</h2>
                {spaces.map((space) => (
                  <Link key={space.id} href={`/products/${encodeURIComponent(space.spaceName)}`}>
                    <SpaceCard spaceData={space} />
                  </Link>
                ))}
              </div>
            ) : (
              <p>No spaces found. Create your first space!</p>
            )}  
          </>
        ) : (
          <TestimonialForm onSubmit={handleFormSubmit} />
        )}
      </div>
    </>
  );
}