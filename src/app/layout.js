// src/app/layout.js
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "What's Your Mood? - AI Song Recommender",
  description: 'Discover the perfect song that matches your current vibe with our personalized mood-based quiz. Get instant YouTube music recommendations tailored to your emotional state.',
  keywords: 'mood quiz, song recommender, music recommendation, YouTube music, mood-based music, personalized playlist',
  authors: [{ name: 'Mood Music App' }],
  creator: 'Mood Music Team',
  publisher: 'Mood Music App',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://your-domain.com'),
  openGraph: {
    title: "What's Your Mood? - AI Song Recommender",
    description: 'Take our 5-question quiz and get personalized music recommendations based on your current mood!',
    url: 'https://your-domain.com',
    siteName: 'Mood Music Recommender',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mood Music Recommender App',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "What's Your Mood? - AI Song Recommender",
    description: 'Discover music that matches your vibe! Take our quick mood quiz.',
    images: ['/twitter-image.png'],
    creator: '@moodmusicapp',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#8b5cf6" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="https://www.youtube.com" as="connect" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "What's Your Mood? - Song Recommender",
              "description": "AI-powered mood-based music recommendation quiz",
              "url": "https://your-domain.com",
              "applicationCategory": "Entertainment",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "creator": {
                "@type": "Organization",
                "name": "Mood Music Team"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 min-h-screen`}>
        <div className="relative min-h-screen">
          {/* Background Animation */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
          
          {/* Main Content */}
          <main className="relative z-10">
            {children}
          </main>
          
          {/* Footer */}
          <footer className="relative z-10 text-center py-8 text-white/70">
            <p className="text-sm">
              Made with ❤️ for music lovers everywhere
            </p>
          </footer>
        </div>
        
        {/* Analytics Script Placeholder */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Add your analytics code here
              console.log('Mood Music App Loaded');
            `,
          }}
        />
      </body>
    </html>
  );
}