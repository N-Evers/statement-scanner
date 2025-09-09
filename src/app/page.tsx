'use client';

import Image from "next/image";
import { useState } from 'react';
export default function Home() {
  const [data, setData] = useState('');

  fetch('http://localhost:3001/process/td_statement.png')
    .then(res => res.json)
    .then(data => console.log(data))
  return (
    <h1>test</h1>
  );
}
