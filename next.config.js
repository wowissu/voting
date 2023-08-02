const { basePath } = require('./config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath,
  output: 'standalone'
}

module.exports = nextConfig
