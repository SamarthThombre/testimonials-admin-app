import React, { useState } from 'react';

const WallOfLoveModal = ({ isOpen, onClose }) => {
  const [showMoreCustomization, setShowMoreCustomization] = useState(false);
  const [maxTestimonials, setMaxTestimonials] = useState(20);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-white text-black p-8 rounded-lg max-w-3xl w-full m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Embed a Wall of Love</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-6">
          <div className="bg-gray-100 p-4 rounded mb-4">
            <p className="text-green-600 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Masonry - fixed
            </p>
            <div className="bg-gray-800 text-gray-300 p-2 rounded mt-2 text-sm overflow-x-auto">
              <code>
                &lt;script type="text/javascript" src="https://testimonial.to/js/iframeResizer.min.js"&gt;&lt;/script&gt;
                <br />
                &lt;iframe id="testimonialto-100xdevs-landing-page-tag-all-light" src="https://embed.testimonial.to/w/"&gt;&lt;/iframe&gt;
                <br />
                &lt;script type="text/javascript"&gt;iFrameResize(&#123;log: false, checkOrigin: false&#125;, "#testimonialto-100xdevs-landing-page-tag-all-light")&lt;/script&gt;
              </code>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex mb-4">
            <button 
              className={`mr-2 px-4 py-2 rounded ${!showMoreCustomization ? 'bg-gray-200' : 'bg-white border'}`}
              onClick={() => setShowMoreCustomization(false)}
            >
              Basic
            </button>
            <button 
              className={`px-4 py-2 rounded ${showMoreCustomization ? 'bg-gray-200' : 'bg-white border'}`}
              onClick={() => setShowMoreCustomization(true)}
            >
              More customization
            </button>
          </div>
          
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remove Testimonial branding 🔒
            </label>


            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Hide the date
            </label>
            
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Randomize the order on page refresh
            </label>
          </div>

          <div className="mt-4">
            <label className="block mb-2">Max number of testimonials in the initial load (max 100)</label>
            <input 
              type="number" 
              value={maxTestimonials} 
              onChange={(e) => setMaxTestimonials(e.target.value)} 
              className="w-16 p-1 border rounded"
              min="1"
              max="100"
            />
          </div>

        </div>


        <div className="flex justify-between">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Close</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Copy</button>
        </div>
      </div>
    </div>
  );
};

export default WallOfLoveModal;