import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        https: {
            key: fs.readFileSync("../server/https/localhost-key.pem"),
            cert: fs.readFileSync("../server/https/localhost.pem")
        },
        proxy: {
            "/reference": {
                target: "https://localhost:443",
                secure: false
            },
            "/auth": {
                target: "https://localhost:443",
                secure: false
            },
            "/users": {    // Add this block
                target: "https://localhost:443",
                secure: false
            }
        }
    }
})
