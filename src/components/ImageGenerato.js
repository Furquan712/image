// src/ImageGenerator.js
import React, { useState } from 'react';
import axios from 'axios';

const ImageGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [imageURL, setImageURL] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/prompthero/openjourney-v4',
        {
          inputs: inputText,
        },
        {
          headers: {
            Authorization: 'Bearer {API_TOKEN}', // Replace with your actual API token
          },
        }
      );

      setImageURL(URL.createObjectURL(await response.data));

    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="max-w-md w-full p-4">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter text..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Generate Image
          </button>
        </form>
        {imageURL && (
          <div className="mt-4">
            <img src={imageURL} alt="Generated" className="w-full" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;
