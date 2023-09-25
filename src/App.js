import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [inputText, setInputText] = useState('');
  const [imageURL, setImageURL] = useState('');
  const API_TOKEN = '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'; // Replace with your actual API token

  useEffect(() => {
    if (inputText) {
      axios
        .post(
          'https://api-inference.huggingface.co/models/prompthero/openjourney-v4',
          {
            inputs: inputText,
          },
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
            responseType: 'blob', // Set responseType to 'blob' to get binary data
          }
        )
        .then((response) => {
          const imageUrl = URL.createObjectURL(response.data);
          setImageURL(imageUrl);
        })
        .catch((error) => {
          console.error('Error generating image:', error);
        });
    }
  }, [inputText]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl mb-4">Image Generation App</h1>
        <form>
          <input
            type="text"
            placeholder="Enter text..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 mb-4"
          />
        </form>
        
        {imageURL && (
          <div className="mt-4">
            <img src={imageURL} alt="Generated" className="w-full" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
