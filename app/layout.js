import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from "./components/ThemeProvider";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- SEO METADATA ---
export const metadata = {
  metadataBase: new URL("https://buttnetworks.com"),
  title: {
    default: "Butt Networks | Custom Web & Mobile App Development Agency",
    template: "%s | Butt Networks",
  },
  description:
    "Expert full-stack development by Wahb Amir & Shahnawaz Saddam. Specializing in Next.js, high-performance dashboards, e-commerce solutions, and digital transformation.",
  keywords: [
    "Butt Networks",
    "Wahb Amir",
    "Shahnawaz Saddam",
    "Web Development Pakistan",
    "Next.js Agency",
    "SaaS Development",
    "Boltform",
    "Digital-X",
    "Custom Admin Dashboards",
    "Full-stack Developers",
  ],
  authors: [
    { name: "Wahb Amir", url: "https://wahb.space" },
    { name: "Shahnawaz Saddam", url: "https://shahnawaz.buttnetworks.com" },
  ],
  creator: "Butt Networks",
  publisher: "Butt Networks",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Butt Networks | Premium Web & Mobile Solutions",
    description:
      "Transforming ideas into scalable digital products. Explore our portfolio including Boltform, Digital-X, and Enterprise Dashboards.",
    url: "https://buttnetworks.com",
    siteName: "Butt Networks",
    images: [
      {
        url: "/butt.png",
        width: 1200,
        height: 630,
        alt: "Butt Networks - Professional Web Development",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Butt Networks | Digital Solutions Agency",
    description:
      "High-performance web apps and dashboards built with Next.js and Tailwind CSS.",
    images: ["/butt.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://buttnetworks.com/#organization",
      name: "Butt Networks",
      url: "https://buttnetworks.com",
      logo: "https://buttnetworks.com/butt.png",
      sameAs: [
        "https://github.com/ShahanwazSaddam144/Butt-Networks",
        "https://github.com/wahb-amir",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "technical support",
        url: "https://buttnetworks.com/Contact",
      },
      founders: [
        {
          "@type": "Person",
          name: "Wahb Amir",
          url: "https://wahb.space",
          sameAs: ["https://github.com/wahb-amir"],
        },
        {
          "@type": "Person",
          name: "Shahnawaz Saddam",
          url: "https://shahnawaz.buttnetworks.com",
          sameAs: ["https://github.com/ShahanwazSaddam144"],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://buttnetworks.com/#website",
      url: "https://buttnetworks.com",
      name: "Butt Networks",
      publisher: { "@id": "https://buttnetworks.com/#organization" },
    },
    {
      "@type": "ItemList",
      name: "Our Featured Projects",
      description:
        "A collection of high-end digital products developed by Butt Networks.",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          url: "https://boltform.wahb.space",
          name: "Boltform",
        },
        {
          "@type": "ListItem",
          position: 2,
          url: "https://digital-x.buttnetworks.com",
          name: "Digital-X",
        },
        {
          "@type": "ListItem",
          position: 3,
          url: "https://admin-dashboard.buttnetworks.com",
          name: "Enterprise Admin Dashboard",
        },
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
