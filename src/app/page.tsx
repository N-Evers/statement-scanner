'use client';

import Image from "next/image";
import { useState } from 'react';
export default function Home() {
const [text, setText] = useState('');


    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
    
        const file = files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('http://localhost:3001/documents', {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            setText(data.text);
        } catch (err) {
            console.error('Upload fialed:', err);
        }
    };

return (
    <div>
        <h1>{text}</h1>
        <input 
            type='file' 
            style={{color: 'blue'}} 
            onChange={handleChange}
            multiple={false}>
        </input>
    </div>
  );
}

/*
const files = e.target.files;
        if (!files || files.length === 0) return;
    
        const file = files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('http://localhost:3001/documents', {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error('Upload failed');
            
            const encodedName = encodeURIComponent(file.name);
            const processRes = await fetch(`http://localhost:3001/process/${encodedName}`);

            const result = await processRes.text()
            setData(result)

        } catch (err) {
            console.error('Upload failed: ', err)
        }
        setFile(file.name);   
*/