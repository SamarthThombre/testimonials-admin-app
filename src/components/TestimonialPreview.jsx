export default function TestimonialPreview({ formData }) {
    return (
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Live preview - Testimonial page</h2>
        <div className="border rounded p-4">
          <div className="text-center">
            <div className="text-6xl mb-4">👍</div>
            <h3 className="text-2xl font-bold mb-2">{formData.headerTitle || 'Header goes here...'}</h3>
            <p className="mb-4">{formData.customMessage || 'Your custom message goes here...'}</p>
          </div>
          <div className="mb-4">
            <h4 className="font-bold mb-2">QUESTIONS</h4>
            <ul className="list-disc pl-5">
              {formData.questions.map((question, index) => (
                <li key={index}>{question}</li>
              ))}
            </ul>
          </div>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded w-full mb-2">
            Record a video
          </button>
          <button className="bg-gray-800 text-white px-4 py-2 rounded w-full">
            Send in text
          </button>
        </div>
      </div>
    );
}