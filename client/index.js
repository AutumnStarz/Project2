import React from 'react';
import { createRoot } from 'react-dom/client';
import PostFeed from './PostFeed'; 

const container = document.getElementById('postFeed');
const root = createRoot(container);

root.render(<PostFeed />);
