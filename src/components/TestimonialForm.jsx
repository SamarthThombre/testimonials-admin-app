"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import TestimonialPreview from "./TestimonialPreview";

export default function TestimonialForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    spaceName: "",
    headerTitle: "",
    customMessage: "",
    questions: [
      "Who are you / what are you working on?",
      "How has (our product / service) helped you?",
      "What is the best thing about (our product / service)?",
    ],
    // collectionType: 'Text and video',
    // collectStarRatings: true
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[index] = value;
    setFormData(prevData => ({
      ...prevData,
      questions: newQuestions
    }));
  };

  const addQuestion = () => {
    if (formData.questions.length < 5) {
        setFormData(prevData => ({
            ...prevData,
            questions: [...prevData.questions, '']
          }));
        }
      };
    
      const removeQuestion = (index) => {
        setFormData(prevData => ({
          ...prevData,
          questions: prevData.questions.filter((_, i) => i !== index)
        }));
      };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onSubmit(formData);
    router.push('/dashboard');
  };

  return (
    <div className="flex">
      <div className="w-1/2 pl-4">
        <TestimonialPreview formData={formData} />
      </div>
      <div className="w-1/2 pr-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded shadow-md"
        >
          <h2 className="text-2xl font-bold mb-4">Create a new Space</h2>
          <p className="mb-4 text-sm text-gray-600">
            After this Space is created, it will generate a dedicated page for
            collecting testimonials.
          </p>

          <div className="mb-4">
            <label htmlFor="spaceName" className="block mb-2">
              Space name *
            </label>
            <input
              type="text"
              id="spaceName"
              name="spaceName"
              value={formData.spaceName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="e.g. My testimonial layout space"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="headerTitle" className="block mb-2">
              Header title *
            </label>
            <input
              type="text"
              id="headerTitle"
              name="headerTitle"
              value={formData.headerTitle}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Would you like to give a shoutout for xyz?"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="customMessage" className="block mb-2">
              Your custom message *
            </label>
            <textarea
              id="customMessage"
              name="customMessage"
              value={formData.customMessage}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Write a warm message to your customers, and give them simple directions on how to make the best testimonial."
              required
            ></textarea>
          </div>

          {/* Add more form fields for questions, collection type, star ratings, theme, button color, and language */}
          <div className="mb-4">
            <h3 className="font-bold mb-2">Questions</h3>
            {formData.questions.map((question, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                  className="flex-grow px-3 py-2 border rounded"
                  maxLength={100}
                />
                <span className="ml-2 text-sm text-gray-500">
                  {question.length}/100
                </span>
                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  className="ml-2 text-red-500"
                >
                  🗑️
                </button>
              </div>
            ))}
            {formData.questions.length < 5 && (
              <button
                type="button"
                onClick={addQuestion}
                className="text-blue-500 hover:text-blue-700"
              >
                + Add one (up to 5)
              </button>
            )}
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
          >
            Create new Space
          </button>
        </form>
      </div>
    </div>
  );
}
