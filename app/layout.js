import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/App-Shell/Navbar";
import Footer from "@/components/App-Shell/Footer";
import { projects } from "../Data/projectsData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://buttnetworks.com";
const siteTitle = "Butt Networks | Custom Web & Mobile App Development Agency";
const siteDescription =
  "Butt Networks builds high-performance Next.js websites, SaaS platforms, and AI-enabled dashboards. Explore featured work such as Resume-AI, ValueMax, URL Shortener, and Zehna Portfolio.";
const featuredProjects = projects.slice(0, 5);
const itemListElement = featuredProjects.map((project, index) => ({
  "@type": "ListItem",
  position: index + 1,
  url: project.demoLink,
  name: project.Heading,
  description: project.description?.slice(0, 160) || project.Text,
}));

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Butt Networks",
  },
  description: siteDescription,
  keywords: [
    "Butt Networks",
    "Shahnawaz Saddam",
    "Web Development Pakistan",
    "Next.js Agency",
    "SaaS Development",
    "URL Shortener",
    "AI Resume Builder",
    "ValueMax",
    "Zehna Portfolio",
    "Custom Admin Dashboards",
    "Full-stack Developers",
  ],
  authors: [
    { name: "Shahnawaz Saddam", url: "https://shahnawaz.buttnetworks.com" },
  ],
  creator: "Butt Networks",
  publisher: "Butt Networks",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon/apple-touch-icon.png",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Butt Networks",
    images: [
      {
        url: "/favicon.png",
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
    images: ["/favicon.png"],
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
      sameAs: ["https://github.com/ShahanwazSaddam144"],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "technical support",
        url: "https://buttnetworks.com/Contact",
      },
      founders: [
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
      itemListElement,
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
        <link rel="icon" href="/favicon.png" type="image/png" />
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
        <Navbar />
          <main>{children}</main>
          <Footer />
      </body>
    </html>
  );
}