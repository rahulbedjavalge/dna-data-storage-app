import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const backendURL = 'https://your-backend-name.onrender.com';
  const [inputText, setInputText] = useState('');
  const [encoded, setEncoded] = useState('');
  const [decoded, setDecoded] = useState('');

  const handleEncode = async () => {
    const response = await axios.post(`${backendURL}/api/encode`, { text: inputText });
    setEncoded(response.data.dna);
  };

  const handleDecode = async () => {
    const response = await axios.post(`${backendURL}/api/decode`, { dna: inputText });
    setDecoded(response.data.text);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>DNA Data Storage</h1>
      <textarea rows="4" value={inputText} onChange={e => setInputText(e.target.value)} />
      <br /><br />
      <button onClick={handleEncode}>Encode to DNA</button>
      <button onClick={handleDecode}>Decode from DNA</button>
      <h3>Encoded DNA:</h3>
      <p>{encoded}</p>
      <h3>Decoded Text:</h3>
      <p>{decoded}</p>
    </div>
  );
}

export default App;
