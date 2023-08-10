const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    // .hex loader
    config.module.rules.push({
      test: /\.hex$/,
      use: {
        loader: './loaders/hexLoader.js'
      },
    })

    return config
  },
}

module.exports = nextConfig