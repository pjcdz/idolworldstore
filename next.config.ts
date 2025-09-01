import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['example.com'], // Añade aquí los dominios de donde vienen las imágenes
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Permite cualquier hostname HTTPS
      },
      {
        protocol: 'http',
        hostname: '**', // Permite cualquier hostname HTTP (solo para desarrollo)
      },
    ],
  },
};

export default nextConfig;
