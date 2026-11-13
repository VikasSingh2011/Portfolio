export const initialPortfolioData = {
  personal: {
    name: "Vikas Singh",
    title: "Full-Stack Developer & AI/ML Engineer",
    batch: "B.Tech Computer Science Engineering (AI/ML) • 2026 Batch",
    tagline: "Building scalable full-stack web applications and intelligent machine learning solutions.",
    bio: "Computer Science Engineering (AI/ML) graduate (2026 Batch) from KCC Institute of Technology and Management with hands-on experience in MERN Stack development, applied Machine Learning, and RESTful API architecture. Proficient in C++, Python, and JavaScript, with experience building scalable web applications using React.js, Next.js, Node.js, Express.js, and MongoDB.",
    location: "Noida, India (Open to Relocation & Remote)",
    email: "singhvikas1004@gmail.com",
    phone: "+91 6386782044",
    avatar: "/images/vikas-singh.jpg",
    resumeUrl: "/Vikas_Singh_Resume.pdf",
    portfolioUrl: "https://portfolio-git-main-vikas-singhs-projects-b53a535f.vercel.app",
    openToWork: true,
    statusText: "Actively seeking 2026 Software Engineering & Analyst Roles",
    yearsOfCoding: "3+ Years",
    projectsCompleted: "15+",
    problemsSolved: "250+ DSA"
  },

  socials: {
    website: "https://portfolio-git-main-vikas-singhs-projects-b53a535f.vercel.app",
    github: "https://github.com/VikasSingh2011",
    linkedin: "https://www.linkedin.com/in/vikas-singh-b52068265/",
    leetcode: "https://leetcode.com",
    geeksforgeeks: "https://geeksforgeeks.org",
    hackerrank: "https://hackerrank.com",
    email: "mailto:singhvikas1004@gmail.com"
  },

  about: {
    story: "I am pursuing my B.Tech in Computer Science Engineering with a specialization in Artificial Intelligence and Machine Learning (AI/ML) at KCC Institute of Technology and Management, Greater Noida (2022–2026 Batch).\n\nMy passion lies at the intersection of full-stack web development and applied data science. Over the course of my internships at TenseAI and developer training at HCLTech, I have engineered scalable web applications, authored RESTful APIs, designed responsive frontends in React and Next.js, and built convolutional neural networks for medical diagnosis.\n\nI believe in writing clean, well-tested code, understanding system fundamentals, and continuously sharpening my algorithmic problem-solving skills across LeetCode and GeeksforGeeks.",
    careerGoals: "Seeking an Analyst, Software Engineering (SDE), or AI/ML Engineering role where I can contribute to technology-driven business solutions, solve complex problems, and engineer scalable digital products.",
    highlights: [
      { label: "Degree", value: "B.Tech in Computer Science Engineering (AI/ML)" },
      { label: "Institution", value: "KCC Institute Of Technology And Management, Greater Noida" },
      { label: "Academic Batch", value: "2022 – 2026 (Graduating Batch)" },
      { label: "Academic Score", value: "7.0 / 10.0 CGPA" },
      { label: "Core Competencies", value: "MERN Stack, Next.js, Python, Deep Learning, SQL, REST APIs" }
    ],
    interests: [
      "MERN Stack & Full-Stack System Design",
      "Computer Vision & Deep Learning (CNNs)",
      "RESTful API Development & JWT Security",
      "Data Analysis, SQL & Machine Learning"
    ]
  },

  experience: [
    {
      id: "exp-1",
      role: "Full Stack Developer Intern",
      company: "TenseAI",
      period: "March 2026 – May 2026",
      location: "Noida / Remote",
      type: "Internship",
      description: "Developing and enhancing full-stack web applications using Next.js, React.js, Node.js, Express.js, and MongoDB. Integrating RESTful APIs and contributing to AI-powered features.",
      technologies: ["Next.js", "React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "Prompt Engineering"],
      achievements: [
        "Built reusable and responsive React.js and Next.js frontend components for client-facing applications.",
        "Integrated AI APIs to handle user queries efficiently and automate workflow pipelines.",
        "Worked on real-world projects including blog management systems and automation tools."
      ]
    },
    {
      id: "exp-2",
      role: "Full Stack Developer Trainee",
      company: "HCLTech",
      period: "Nov 20, 2024 – March 18, 2025",
      location: "Noida, India",
      type: "Training & Certification",
      description: "Underwent intensive hands-on training in full-stack web development and data analytics. Built and tested REST APIs using Node.js and Express.",
      technologies: ["Node.js", "Express.js", "React.js", "MongoDB", "Python", "SQL", "JWT Auth", "Git"],
      achievements: [
        "Earned HCLTech JWD AI & Web Development Certificate demonstrating foundational engineering skills.",
        "Implemented full frontend-backend integration using React and MongoDB with secure JWT auth & CRUD operations.",
        "Analyzed and processed structured data using Python and SQL to retrieve, clean, and transform application datasets."
      ]
    }
  ],

  projects: [
    {
      id: "bookstore-mern",
      title: "BookStore (MERN Stack)",
      tagline: "Full-Stack Online Bookstore & E-Commerce Application",
      description: "Developed a MERN-based e-commerce application with customer authentication, product catalog exploration, and API-driven content. Features secure JWT login/signup, persistent shopping cart, and MongoDB storage.",
      category: "Full-Stack",
      technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS", "JWT Auth", "REST APIs"],
      github: "https://github.com/VikasSingh2011",
      demo: "https://mern-bookstore-demo.vercel.app",
      image: "/images/projects/bookstore.jpg",
      featured: true,
      keyPoints: [
        "Developed a MERN-based e-commerce application with authentication, product listing, and API-driven content",
        "Implemented JWT-based login/signup and MongoDB data storage",
        "Improved page load efficiency and user flow through modular React components"
      ]
    },
    {
      id: "brain-tumor-detection",
      title: "TumorTracer - Brain Tumor Detection",
      tagline: "Deep Learning CNN Architecture for Medical MRI Scan Classification",
      description: "Developed a CNN-based Brain Tumor Detection model to classify cranial MRI scans as tumor or non-tumor. Preprocessed and augmented 3,000+ MRI images to improve model generalization, achieving 94% accuracy.",
      category: "AI / ML",
      technologies: ["Python", "TensorFlow", "Keras", "OpenCV", "Scikit-Learn", "Matplotlib", "NumPy", "Streamlit"],
      github: "https://github.com/VikasSingh2011",
      demo: "https://brain-tumor-detection-ai.streamlit.app",
      image: "/images/projects/brain-tumor.jpg",
      featured: true,
      keyPoints: [
        "Achieved 94% test accuracy classifying MRI scans as tumor or non-tumor",
        "Preprocessed and augmented 3,000+ MRI images with Gaussian blur, CLAHE contrast tuning, and normalization",
        "Evaluated model performance using confusion matrix, precision-recall metrics, and ROC curves"
      ]
    },
    {
      id: "your-own-ai",
      title: "Your-Own-AI (Conversational Chatbot)",
      tagline: "Full-Stack Intelligent AI Assistant with Streaming Responses",
      description: "Developed a full-stack AI assistant with a responsive chat interface using React.js and Node.js. Integrated AI APIs to generate real-time responses and handle user queries efficiently with persistent session context.",
      category: "Full-Stack & AI",
      technologies: ["React.js", "Node.js", "Express.js", "AI APIs", "Tailwind CSS", "Server-Sent Events"],
      github: "https://github.com/VikasSingh2011",
      demo: "https://ai-chatbot-assistant.vercel.app",
      image: "/images/projects/your-own-ai.jpg",
      featured: true,
      keyPoints: [
        "Developed full-stack AI assistant with responsive chat interface using React.js and Node.js",
        "Integrated AI APIs to generate real-time responses and handle user queries efficiently",
        "Implemented secure API communication and deployed the application for online access"
      ]
    },
    {
      id: "enterprise-voting-app",
      title: "Enterprise Voting App",
      tagline: "Real-Time Online Voting System with Socket.IO & Admin Portal",
      description: "Built a full-stack online voting application using React.js, Node.js, Express.js, and MongoDB. Implemented secure voter authentication, real-time vote updates with Socket.IO, and an administrative analytics dashboard.",
      category: "Full-Stack",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "Render", "JWT"],
      github: "https://github.com/VikasSingh2011",
      demo: "https://enterprise-voting-app.onrender.com",
      image: "/images/projects/voting-app.jpg",
      featured: true,
      keyPoints: [
        "Built full-stack voting system with React.js, Node.js, Express.js, and MongoDB Atlas",
        "Implemented secure login, real-time vote count streaming via Socket.IO, and admin dashboard",
        "Deployed application on Render with robust error handling and JWT-based authorization"
      ]
    },
    {
      id: "mern-todo-app",
      title: "MERN Task Manager (TODO App)",
      tagline: "Collaborative Productivity & Project Workflow Management",
      description: "A high-performance task management application built with the MERN stack. Features drag-and-drop Kanban status columns, priority flags, deadline countdowns, and real-time state synchronization.",
      category: "Full-Stack",
      technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS", "Socket.io"],
      github: "https://github.com/VikasSingh2011",
      demo: "https://mern-todo-workflow.vercel.app",
      image: "/images/projects/todo-app.jpg",
      featured: false,
      keyPoints: [
        "Full CRUD task management with MongoDB Atlas and Express REST API backend",
        "Interactive priority tagging, category filtering, and status progression",
        "Responsive, modern user interface optimized for fast mobile and desktop productivity"
      ]
    },
    {
      id: "pixabay-clone",
      title: "Pixabay Image Gallery Clone",
      tagline: "Responsive Media Discovery App with Dynamic Search",
      description: "Built a responsive image gallery web application with dynamic search and display using the Pixabay REST API. Designed an intuitive, clean UI with reusable React components to enhance user experience.",
      category: "Frontend",
      technologies: ["React.js", "HTML5", "CSS3", "JavaScript", "Pixabay API", "Vercel"],
      github: "https://github.com/VikasSingh2011",
      demo: "https://pixabay-clone-app.vercel.app",
      image: "/images/projects/pixabay-clone.jpg",
      featured: false,
      keyPoints: [
        "Dynamic search and image gallery pagination using the Pixabay REST API",
        "Modular React component hierarchy with responsive masonry layout",
        "Deployed on Vercel with smooth loading skeletons and image modal previews"
      ]
    }
  ],

  skills: {
    "Programming Languages": [
      { name: "Python", level: 90, badge: "Advanced" },
      { name: "C++", level: 86, badge: "Proficient" },
      { name: "JavaScript (ES6+)", level: 92, badge: "Advanced" },
      { name: "C", level: 80, badge: "Proficient" },
      { name: "SQL", level: 88, badge: "Advanced" }
    ],
    "Frontend Development": [
      { name: "React.js", level: 94, badge: "Expert" },
      { name: "Next.js", level: 86, badge: "Proficient" },
      { name: "Tailwind CSS", level: 92, badge: "Advanced" },
      { name: "HTML5 & CSS3", level: 95, badge: "Expert" }
    ],
    "Backend & APIs": [
      { name: "Node.js", level: 90, badge: "Advanced" },
      { name: "Express.js", level: 90, badge: "Advanced" },
      { name: "RESTful API Design", level: 92, badge: "Advanced" },
      { name: "JWT Authentication", level: 88, badge: "Proficient" }
    ],
    "Databases & Cloud": [
      { name: "MongoDB & Atlas", level: 90, badge: "Advanced" },
      { name: "MySQL / SQL", level: 85, badge: "Proficient" },
      { name: "Google Cloud Platform (GCP)", level: 75, badge: "Foundational" },
      { name: "AWS (Basic)", level: 72, badge: "Foundational" },
      { name: "Render & Vercel", level: 90, badge: "Advanced" },
      { name: "Hostinger", level: 80, badge: "Proficient" }
    ],
    "Machine Learning & Data Science": [
      { name: "Machine Learning (Scikit-Learn)", level: 85, badge: "Proficient" },
      { name: "Deep Learning (CNNs)", level: 82, badge: "Proficient" },
      { name: "Pandas & NumPy", level: 88, badge: "Advanced" },
      { name: "Data Analysis & Visualization", level: 86, badge: "Advanced" },
      { name: "Power BI, Matplotlib & Seaborn", level: 82, badge: "Proficient" }
    ],
    "Tools & Platforms": [
      { name: "Git & GitHub", level: 92, badge: "Advanced" },
      { name: "VS Code", level: 94, badge: "Expert" },
      { name: "Postman API Testing", level: 90, badge: "Advanced" },
      { name: "Jupyter Notebook", level: 88, badge: "Advanced" },
      { name: "Canva", level: 85, badge: "Proficient" }
    ]
  },

  codingProfiles: [
    {
      platform: "LeetCode",
      username: "VikasSingh2011",
      url: "https://leetcode.com",
      stats: "250+ Problems Solved",
      badge: "DSA Specialist",
      highlight: "Data Structures & Algorithms: Arrays, Graphs, DP, Trees",
      color: "from-amber-500 to-orange-600"
    },
    {
      platform: "GitHub",
      username: "VikasSingh2011",
      url: "https://github.com/VikasSingh2011",
      stats: "25+ Repositories • Active Builder",
      badge: "Open Source",
      highlight: "MERN Stack applications, AI models, and web tools",
      color: "from-slate-700 to-slate-900"
    },
    {
      platform: "LinkedIn",
      username: "in/vikas-singh-b52068265",
      url: "https://www.linkedin.com/in/vikas-singh-b52068265/",
      stats: "500+ Connections",
      badge: "Tech Community",
      highlight: "Sharing engineering projects, internships & learnings",
      color: "from-blue-600 to-sky-700"
    },
    {
      platform: "GeeksforGeeks",
      username: "vikassingh2011",
      url: "https://geeksforgeeks.org",
      stats: "20+ Practice Problems",
      badge: "Problem Solver",
      highlight: "Core computer science and algorithm practice",
      color: "from-emerald-600 to-teal-700"
    },
    {
      platform: "HackerRank",
      username: "vikassingh2011",
      url: "https://hackerrank.com",
      stats: "Problem Solving & Python",
      badge: "Certified",
      highlight: "Algorithm design, Python syntax and SQL queries",
      color: "from-green-600 to-emerald-800"
    }
  ],

  freelanceServices: [
    {
      id: "srv-1",
      title: "Full-Stack Web Development (MERN)",
      description: "Custom, scalable web applications built from scratch with modern MERN architecture, responsive UI, secure JWT authentication, and REST APIs.",
      deliverables: ["Full MERN Stack Implementation", "Database Schema & Optimization", "Authentication & Authorization", "1 Month Support"],
      icon: "Code2",
      turnaround: "1 - 3 Weeks",
      popular: true
    },
    {
      id: "srv-2",
      title: "React.js & Next.js Frontend Development",
      description: "Transform designs into pixel-perfect, lightning-fast React / Next.js web applications with clean state management and Tailwind CSS styling.",
      deliverables: ["Pixel-Perfect Mobile Responsive", "Tailwind CSS Styling", "Component State Management", "Lighthouse 90+ Score"],
      icon: "Layout",
      turnaround: "3 - 7 Days",
      popular: false
    },
    {
      id: "srv-3",
      title: "Landing Pages & Portfolio Websites",
      description: "High-conversion landing pages and personal branding portfolios designed to impress recruiters, clients, and investors with modern micro-animations.",
      deliverables: ["Custom Modern Design", "Interactive Showcases", "SEO & OpenGraph Setup", "Fast Deployment on Vercel / Render"],
      icon: "Sparkles",
      turnaround: "2 - 5 Days",
      popular: true
    },
    {
      id: "srv-4",
      title: "Bug Fixing, API Integration & Performance",
      description: "Fix tricky frontend or backend bugs, resolve API integration hurdles, optimize database queries, and improve page load speed.",
      deliverables: ["Code Review & Audit", "Bottleneck Elimination", "Mobile Responsiveness Fixes", "Detailed Resolution Report"],
      icon: "Bug",
      turnaround: "24 - 48 Hours",
      popular: false
    }
  ],

  creativeStudio: {
    enabled: false, // Hidden until creative projects are added via CMS
    tagline: "Video editing, digital content creation, and visual storytelling.",
    items: [
      {
        id: "cs-1",
        title: "Tech Explainer Short & Reel",
        category: "Video Editing",
        description: "Dynamic fast-paced tech tutorial editing with subtitles, sound design, and motion graphics.",
        link: "https://youtube.com",
        thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=600&auto=format&fit=crop"
      },
      {
        id: "cs-2",
        title: "Developer Portfolio High-CTR Thumbnails",
        category: "Graphic Design",
        description: "Engaging 3D renders and typography compositions for YouTube and social media.",
        link: "https://behance.net",
        thumbnail: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop"
      }
    ]
  },

  education: [
    {
      id: "edu-1",
      degree: "Bachelor of Technology in Computer Science Engineering (AI/ML)",
      institution: "KCC Institute Of Technology And Management, Greater Noida",
      period: "2022 – 2026 (Graduating Batch)",
      grade: "CGPA: 7.0 / 10.0",
      details: "Specialization in Artificial Intelligence & Machine Learning. Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Machine Learning, Deep Learning, Operating Systems, Web Technologies."
    }
  ],

  certifications: [
    {
      id: "cert-1",
      name: "Earned JWD AI Certificate — HCLTech",
      issuer: "HCLTech",
      date: "2025",
      credentialUrl: "https://hcltech.com",
      skills: ["AI Foundations", "Full Stack Development", "Node.js", "React.js", "Python"]
    },
    {
      id: "cert-2",
      name: "Full Stack Web Development & REST APIs",
      issuer: "HCLTech Developer Trainee Program",
      date: "2024 - 2025",
      credentialUrl: "https://hcltech.com",
      skills: ["Node.js", "Express.js", "MongoDB", "React.js", "JWT Auth"]
    },
    {
      id: "cert-3",
      name: "250+ Solved DSA Problems",
      issuer: "LeetCode & GeeksforGeeks",
      date: "2024 - 2026",
      credentialUrl: "https://leetcode.com",
      skills: ["Algorithms", "Data Structures", "Dynamic Programming", "C++"]
    }
  ],

  sectionVisibility: {
    about: true,
    experience: true,
    projects: true,
    skills: true,
    codingProfiles: true,
    services: true,
    creative: false,
    resume: true,
    contact: true
  },

  adminConfig: {
    passcode: "admin123",
    supabase: {
      url: "",
      anonKey: "",
      tableName: "portfolio_data"
    }
  }
};
