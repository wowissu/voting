const { basePath } = require('./config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,
  env: {
    ADMIN_PASSWORD: process.env.NODE_ENV !== 'production' ? "juqilin2023" : ""
  }
}

module.exports = nextConfig
