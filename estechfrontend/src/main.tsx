import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { queryClient } from '@src/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </React.StrictMode>
);
