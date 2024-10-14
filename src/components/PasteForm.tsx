'use client'

import React, { useState } from 'react';

const PasteForm = () => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to submit the paste content to the server
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your text here..."
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default PasteForm;
