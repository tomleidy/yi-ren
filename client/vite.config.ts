import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from "fs";
import { configDefaults } from 'vitest/config'

export default defineConfig({
    plugins: [react()],
    server: {
        // Only configure HTTPS if cert files exist
        ...(fs.existsSync("../server/https/localhost-key.pem") ? {
            https: {
                key: fs.readFileSync("../server/https/localhost-key.pem"),
                cert: fs.readFileSync("../server/https/localhost.pem")
            }
        } : {}),
        proxy: {
            "/reference": {
                target: "https://localhost:443",
                secure: false
            },
            "/auth": {
                target: "https://localhost:443",
                secure: false
            },
            "/users": {
                target: "https://localhost:443",
                secure: false
            }
        }
    },
    test: {
        environment: 'jsdom',
        exclude: [...configDefaults.exclude, 'e2e/*'],
        globals: true
    }
})