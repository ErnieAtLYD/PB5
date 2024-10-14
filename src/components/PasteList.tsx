'use client';

import React, { useEffect, useState } from 'react';

const PasteList = () => {
  const [pastes, setPastes] = useState([]);

  useEffect(() => {
    // Logic to fetch pastes from the server
  }, []);

  return (
    <ul>
      {pastes.map((paste, index) => (
        <li key={index}>{paste.content}</li>
      ))}
    </ul>
  );
};

export default PasteList;
