export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  technologies: string[];
  description: string;
  highlights: string[];
  features?: string[];
  isFeatured?: boolean;
}

export interface SkillCategory {
  name: string;
  description: string;
  skills: {
    name: string;
    description: string;
    levelTag?: string;
  }[];
}

export const PERSONAL_INFO = {
  name: "Janvi Raj",
  role: "Full Stack Web Developer",
  educationSubtitle: "BCA Graduate | Full Stack Web Developer",
  email: "rajjanvi47@gmail.com",
  phone: "+91 9877929194",
  location: "Ludhiana, Punjab, India",
  availability: "Available for Full Stack Opportunities",
  summaryQuote:
    "Enthusiastic Full Stack Web Developer passionate about building modern, functional and user-friendly web applications. I enjoy transforming ideas into digital experiences using modern web technologies and AI-assisted development.",
  aboutText:
    "I am a BCA graduate with hands-on experience in full stack web development. I enjoy working with modern web technologies, databases, and AI-assisted development tools. I am passionate about learning new technologies, writing effective prompts, and creating clean, functional web solutions.",
  strengths: [
    { title: "Passionate", desc: "Driven by curiosity to build impactful web applications" },
    { title: "Enthusiastic", desc: "Excited to embrace new paradigms and tech stacks" },
    { title: "Hardworking", desc: "Dedicated to disciplined code quality and timely execution" },
    { title: "Team Player", desc: "Collaborative mindset with respectful communication" },
    { title: "Strong Willingness to Learn", desc: "Fast learner eager to master modern tools & workflows" }
  ],
  languagesSpoken: ["English", "Hindi", "Punjabi"],
  interests: ["Playing Badminton"],
  education: {
    degree: "Bachelor of Computer Applications (BCA)",
    college: "Devki Devi Jain College, Ludhiana",
    affiliation: "Affiliated to Panjab University",
    percentage: "79%",
    cgpa: "8.3",
    period: "Graduated",
    coreSubjects: [
      "Data Structures & Algorithms",
      "Database Management Systems (DBMS)",
      "Web Technologies & Full Stack Dev",
      "Object Oriented Programming (C++, Java/VB)",
      "Software Engineering & Architecture",
      "Operating Systems & Networks"
    ]
  }
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Languages & Frameworks",
    description: "Core programming languages, modern client-side libraries, and server runtimes",
    skills: [
      { name: "React JS", description: "Component architecture, hooks, and responsive dynamic UI development" },
      { name: "Node.js", description: "Backend runtime environment, API services, and server architecture" },
      { name: "JavaScript", description: "Modern ES6+ syntax, asynchronous programming, DOM manipulation" },
      { name: "HTML", description: "Semantic markup, accessibility structure, modern standards" },
      { name: "CSS", description: "Modern layouts, responsive design, Flexbox, Grid, custom styling" },
      { name: "PHP", description: "Server-side scripting, request handling, and backend web processing" },
      { name: "VB.NET", description: "Object-oriented desktop & event-driven application programming" },
      { name: "WordPress", description: "Content management, theme customization, and template structure" },
      { name: "C", description: "Fundamental computer programming, memory concepts, algorithm design" },
      { name: "C++", description: "Object-oriented software concepts, pointers, standard template library" }
    ]
  },
  {
    name: "Databases",
    description: "Relational and document databases, data modeling, and query management",
    skills: [
      { name: "MongoDB", description: "NoSQL document database, Mongoose schemas, flexible JSON document storage" },
      { name: "SQL", description: "Structured querying, relational joins, table schemas, aggregate queries" },
      { name: "DBMS", description: "Relational design, normalization, ACID properties, data integrity" }
    ]
  },
  {
    name: "AI & Modern Tools",
    description: "Modern accelerated development workflows, prompt engineering, and rapid prototyping",
    skills: [
      { name: "AI-assisted Development", description: "Accelerating full-stack engineering using modern AI tools & code generation" },
      { name: "Vibe Coding", description: "Iterative prompt-driven and flow-state development for modern web solutions" },
      { name: "Effective Prompt Writing", description: "Crafting structured, high-context prompts for accurate code generation & debugging" }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "travel-website",
    title: "Travel Website",
    category: "Full Stack Project",
    tagline: "Web-based travel discovery and booking experience platform",
    technologies: ["React JS", "Node.js", "Express", "Database Integration", "CSS3 / Modern UI"],
    description: "A travel website project focused on providing a web-based travel experience.",
    highlights: [
      "User-friendly web interface designed for travel destination discovery",
      "Full-stack architecture bridging interactive client layouts with backend services",
      "Clean, modern layout highlighting destinations and travel content"
    ],
    isFeatured: true
  },
  {
    id: "airbnb-clone",
    title: "Airbnb-Inspired Web Application",
    category: "Full Stack Web Application",
    tagline: "Feature-complete accommodation booking & listing management platform",
    technologies: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "EJS",
      "Bootstrap",
      "JavaScript"
    ],
    description:
      "Built an Airbnb-inspired full-stack web application featuring property listings, CRUD operations, user authentication, reviews and ratings, MongoDB database integration, and server-side validation.",
    highlights: [
      "Property Listings with full Create, Read, Update, and Delete (CRUD) operations",
      "Secure User Authentication & Session Authorization system",
      "Interactive Reviews & Ratings architecture linked to specific listings",
      "MongoDB & Mongoose schema design with robust server-side data validation",
      "Responsive UI built with Bootstrap and dynamic EJS templating"
    ],
    isFeatured: true
  },
  {
    id: "mini-projects",
    title: "Mini Projects Collection",
    category: "Web Experiments & Concept Practice",
    tagline: "Dedicated front-end and back-end concept implementations",
    technologies: ["JavaScript", "HTML5", "CSS3", "PHP", "Node.js", "SQL"],
    description:
      "Designed and developed several small-scale web projects to practice and strengthen front-end and back-end development concepts.",
    highlights: [
      "Reinforced core algorithmic and asynchronous JavaScript mechanisms",
      "Implemented responsive web components and interactive widgets",
      "Tested database queries, form handlers, and server-side scripts"
    ],
    isFeatured: false
  }
];
