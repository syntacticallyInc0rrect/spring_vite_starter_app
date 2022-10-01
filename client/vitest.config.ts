/// <references types="vitest" />
import {defineConfig} from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'happy-dom',
        setupFiles: './src/__tests/setupTests.ts',
        coverage: {
            exclude: ['node_modules/', 'setupTests.ts']
        }
    },
});
