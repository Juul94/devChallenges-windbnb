import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    define: {
        'process.env': process.env,
    },
    resolve: {
        alias: {
            '~': resolve(__dirname, 'src'),
        },
    },
});
