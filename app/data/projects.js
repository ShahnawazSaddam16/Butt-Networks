export const projects = [
  {
    id: "digital-website",
    heading: "Digital Website",
    description:
      "Next.js and Tailwind were used to create a quick, SEO-ready marketing platform that is accessible, responsive, and optimised for high Core Web Vitals.",
    demoLink: "https://digital-x.buttnetworks.com/",
    githubLink: "https://github.com/ShahanwazSaddam144/digital-x",
    images: [
      "/projects/Digital/Home.png",
      "/projects/Digital/Main.png",
      "/projects/Digital/Near-footer.png",
      "/projects/Digital/Footer.png",
    ],
    tech: ["Next.js", "Tailwind CSS", "React", "Vercel", "SEO"],
    authors: [
      {
        name: "Wahb Amir",
        role: "Backend & DevOps",
        portfolio: "https://wahb.space",
      },
      {
        name: "Shahnawaz Butt",
        role: "Frontend & UI/UX",
        portfolio: "https://shahnawaz.buttnetworks.com",
      },
    ],
    startDate: "October 7,2025",
    endDate: "December 10,2025",
    status: "completed",
    highlights: [
      "SEO-friendly pages with dynamic routing",
      "Mobile-first responsive UI across breakpoints",
      "ISR/SSR performance tuning for fast load times",
    ],
    priority: 3,
  },
  {
    id: "portfolio-website",
    heading: "Portfolio Website",
    description:
      "A polished portfolio featuring a contact workflow, Dark Mode, and a full-stack build for content management and smooth client updates.",
    demoLink: "https://syedzeeshanhaider.netlify.app/",
    githubLink: "https://github.com/wahb-amir/Zeeshan",
    images: [
      "/projects/Portfolio/home.png",
      "/projects/Portfolio/main.png",
      "/projects/Portfolio/achievements.png",
      "/projects/Portfolio/projects.png",
    ],
    tech: ["Next.js", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    authors: [
      { name: "Wahb Amir", role: "Frontend", portfolio: "https://wahb.space" },
      {
        name: "Shahnawaz Butt",
        role: "Frontend & Design",
        portfolio: "https://shahnawaz.buttnetworks.com",
      },
    ],
    startDate: "September 11, 2025",
    endDate: "September 13, 2025",
    status: "completed",
    highlights: [
      "User-friendly dark mode and smooth UI transitions",
      "Contact form with reliable email integration",
      "Simple CMS for client-managed content",
    ],
    priority: 4,
  },
  {
    id: "client-dev-platform",
    heading: "Client–Dev Collaboration Platform",
    description:
      "A unified platform connecting clients and development teams — request quotes, receive email alerts, view project progress & assignees, chat with developers, and automatically sync GitHub repo activity to project status.",
    demoLink: "https://Dashboard.wahb.space",
    githubLink: [
      {
        url: "https://github.com/wahb-amir/dev-Dashboard",
        name: "Client App",
      },
      {
        url: "https://github.com/wahb-amir/Dashboard",
        name: "Developer App",
      },
    ],
    images: [
      "/projects/Platform/Login.png",
      "/projects/Platform/Dashboard.png",
      "/projects/Platform/Quote.png",
    ],
    tech: [
      "Next.js",
      "React",
      "Node.js",
      "Tailwind",
      "MongoDB",
      "GitHub Webhooks",
    ],
    authors: [
      {
        name: "Wahb Amir",
        role: "Full-Stack Engineer",
        portfolio: "https://wahb.space",
      },
    ],
    role: "Full-Stack Engineer",
    category: "Platform",
    status: "Updating",
    highlights: [
      "Built a comprehensive client portal allowing quote requests, project progress tracking, visibility into who’s working on what, and direct chat with assigned developers.",
      "Developed a developer Dashboard to manage tasks, update progress, assign team members, and efficiently review client requests in a single workspace.",
      "Implemented role-based access control (RBAC) ensuring Clients, PMs, and Developers see only the views and actions relevant to them.",
      "Automated user setup and project onboarding, including GitHub repository creation and webhook integration to sync commits and PR events directly to project status.",
      "Integrated real-time communication with Socket.io, plus email and in-app alerts for quote responses, status changes, and mentions to keep all stakeholders informed.",
      "Deployed the platform with CI/CD pipelines and secure OAuth authentication for seamless GitHub integration.",
      "Delivered a unified collaboration surface that improved visibility, reduced coordination friction, and allowed clients to track progress while developers maintained an organized workflow.",
      "Enabled automation for repository creation and progress tracking, and implemented key features including quote requests, notifications, real-time chat, progress timelines, and role-based authorization.",
    ],
    startDate: "November 1,2025",
    endDate: null,
    outcome:
      "Delivered a single collaboration surface that improved visibility and reduced coordination friction for both clients and developers.",
    problem:
      "Clients and development teams lacked a single workspace to request quotes, track progress, communicate, and sync repository activity into task status.",
    stats: {
      automation: "Auto repo creation & webhook sync for project status",
      features:
        "Quote requests, email alerts, real-time chat, progress timeline, role-based auth",
    },
    priority: 10,
  },

  //   {
  //     id: "tic-tac-toe",
  //     heading: "Tic Tac Toe",
  //     description:
  //       "Fun, responsive, and mobile-friendly, this lightweight, polished Tic Tac Toe features an AI opponent and clear user interface feedback.",
  //     demoLink: "https://tic-tac-toebuttnetworks.netlify.app/",
  //     githubLink: "https://github.com/buttnetworks/tic-tac-toe",
  //     images: ["/project.png", "/project.png"],
  //     tech: ["React", "JavaScript", "CSS", "HTML"],
  //     authors: [
  //       {
  //         name: "Shahnawaz Butt",
  //         role: "Frontend & Game Logic",
  //         portfolio: "https://shahnawaz.buttnetworks.com",
  //       },
  //     ],
  //     startDate: "2024-09-10",
  //     endDate: "2024-09-20",
  //     status: "completed",
  //     highlights: [
  //       "AI opponent with predictable difficulty curve",
  //       "Responsive controls and quick game loop",
  //       "Polished win detection and subtle UI animations",
  //     ],
  //     priority: 3,
  //   },
  {
    id: "ecommerce-store",
    heading: "E-Commerce Store",
    description:
      "A safe, ready-to-use online store with JWT authentication, Stripe payments, and persistent cart syncing across devices.",
    demoLink: "https://boltform.buttnetworks.com/",
    githubLink: "https://github.com/coder101-js/Ecommer-Store",
    downloadLink: "BoltForm.apk",
    githubLink: "https://github.com/wahb-amir/Ecommer-Store",

    images: [
      "/projects/Ecom/light-shop.png",
      "/projects/Ecom/light-men.png",
      "/projects/Ecom/light-women.png",
      "/projects/Ecom/light-product.png",
      "/projects/Ecom/stripe.png",
    ],
    tech: ["Next.js", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    authors: [
      {
        name: "Wahb Amir",
        role: "Frontend & UX & Backend & Payments",
        portfolio: "https://wahb.space",
      },
      {
        name: "Shahnawaz Butt",
        role: "Mobile App",
        portfolio: "https://shahnawaz.buttnetworks.com",
      },
    ],
    startDate: "July 19, 2025",
    endDate: "July 26, 2025",
    status: "completed",
    highlights: [
      "Secure Stripe checkout and payment flows",
      "JWT authentication and cart persistence",
      "Category browsing and admin-ready product management",
    ],
    priority: 7,
  },
  {
    id: "Admin-Dashboard",
    heading: "Admin-Dashboard",
    description:
      "A powerful and secure admin Dashboard designed to manage users, content, and system data efficiently, featuring role-based access control, real-time analytics, and centralized tools for monitoring and maintaining application performance.",
    demoLink: "https://admin-Dashboard.buttnetworks.com/",
    githubLink: "https://github.com/ShahanwazSaddam144/admin-panel",
    githubLink: "https://github.com/ShahanwazSaddam144/admin-panel",

    images: [
      "/projects/Dashboard/Home.png",
      "/projects/Dashboard/Login.png",
      "/projects/Dashboard/Dashboard.png",
    ],
    tech: ["Next.js", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    authors: [
      {
        name: "Shahnawaz Butt",
        role: "Full Stack",
        portfolio: "https://shahnawaz.buttnetworks.com",
      },
    ],
    startDate: "December 30, 2025",
    endDate: "January 4, 2026",
    status: "completed",
    highlights: [
      "Role-based admin access with secure authentication",
      "Real-time Dashboard analytics and activity monitoring",
      "User, content, and system management from a centralized panel",
    ],
    priority: 8,
  },

  {
    id: "Key&Chains",
    heading: "Key and Chains",
    description:
      "A powerful and secure e-commerce store designed to manage products, content, and system data efficiently, featuring role-based access control, real-time analytics, and centralized tools for monitoring and maintaining application performance.",
    demoLink: "https://key-chains.buttnetworks.com/",
    githubLink: "https://github.com/ShahanwazSaddam144/Key---Chains",
    githubLink: "https://github.com/ShahanwazSaddam144/Key---Chains",

    images: [
      "/projects/KeyChains/Home.png",
      "/projects/KeyChains/Home.png",
      "/projects/KeyChains/Home.png",
    ],
    tech: ["Next.js", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    authors: [
      {
        name: "Shahnawaz Butt",
        role: "Full Stack",
        portfolio: "https://shahnawaz.buttnetworks.com",
      },
    ],
    startDate: "December 8, 2025",
    endDate: "January 13, 2026",
    status: "completed",
    highlights: [
      "Role-based e-commerce store with secure authentication",
      "Real-time products, customer supports and user interface",
      "User, content, and system management from a centralized panel",
    ],
    priority: 5,
  },
];
