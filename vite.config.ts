import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: '/devChallenges-windbnb',
    plugins: [react()],
    build: {
        outDir: 'build',
    },
    resolve: {
        alias: {
            '~': '/src',
        },
    },
});
