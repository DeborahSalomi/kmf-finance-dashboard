import { useState, useEffect } from 'react';

// Logic to include in your data-context
const [rawData, setRawData] = useState([]);

// This function will fetch your pre-compiled master file on startup
useEffect(() => {
  fetch('/data/kmf-master.json')
    .then(res => res.json())
    .then(data => setRawData(data));
}, []);