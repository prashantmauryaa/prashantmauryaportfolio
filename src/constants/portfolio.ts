// Portfolio constants - All portfolio data in one place

export interface Author {
  _id: string;
  name: string;
  initials: string;
  avatar?: {
    asset?: {
      url?: string;
    };
  };
  description?: any[];
  summary?: any[];
  location?: string;
  skills?: string[];
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
    email?: string;
  };
}

export interface WorkExperience {
  _id: string;
  company: string;
  title: string;
  logo?: {
    asset?: {
      url?: string;
    };
  };
  location?: string;
  startDate: string;
  endDate?: string;
  description?: any[];
  url?: string;
}

export interface Education {
  _id: string;
  school: string;
  degree: string;
  logo?: {
    asset?: {
      url?: string;
    };
  };
  startDate: string;
  endDate: string;
  url?: string;
}

export interface Project {
  _id: string;
  title: string;
  description: any[];
  startDate?: string;
  endDate?: string;
  technologies?: string[];
  image?: {
    asset?: {
      url?: string;
    };
  };
  video?: string;
  links?: {
    title: string | null;
    url: string | null;
    type: string | null;
  }[];
}

// Portfolio data
export const AUTHOR: Author = {
  _id: "author-1",
  name: "Prashant Maurya",
  initials: "PM",
  avatar: {
    asset: {
      url: "/projects/avatar.jpg",
    },
  },
  description: [
    {
      _type: "block",
      children: [
        {
          _type: "span",
          text: "Building thoughtful digital solutions. Still learning. Still improving. Still building. Always.",
        },
      ],
    },
  ],
  summary: [
    {
      _type: "block",
      children: [
        {
          _type: "span",
          text: "I'm an engineering student who enjoys building thoughtful, real-world digital solutions at the intersection of technology, creativity, and problem-solving. I'm driven by curiosity and a strong desire to understand how things work—then make them better. My journey involves hands-on experience with programming, web development, and emerging technologies, where I focus on creating clean, efficient, and user-centric solutions. I enjoy working on projects from idea to execution, constantly refining my skills through experimentation and learning. Beyond technical growth, I value teamwork, leadership, and community involvement. Collaborating with diverse teams and taking initiative in student-led activities have shaped my ability to communicate clearly, adapt quickly, and perform under pressure. What excites me most is building things that have purpose—projects that solve problems, improve experiences, and make a measurable difference.",
        },
      ],
    },
  ],
  location: "India",
  skills: [
    "Next.js 15",
    "React",
    "TailwindCSS",
    "JavaScript",
    "Framer Motion",
    "Node.js",
    "MongoDB",
    "Express.js",
    "VS Code",
    "Postman",
    "Photoshop",
    "Git",
  ],
  social: {
    github: "https://github.com/prashantmauryaa",
    linkedin: "https://www.linkedin.com/in/prashantmauryaa/",
    email: "mauryaprashant270@gmail.com",
  },
};

export const WORK_EXPERIENCE: WorkExperience[] = [
  // Add your work experience here in the future
];

export const EDUCATION: Education[] = [
  {
    _id: "edu-1",
    school: "United Group of Institutions",
    degree: "B.Tech, CSE (AIML)",
    startDate: "September 2024",
    endDate: "Present",
  },
  {
    _id: "edu-2",
    school: "Universal Public School",
    degree: "High School",
    startDate: "April 2019",
    endDate: "March 2021",
  },
  {
    _id: "edu-3",
    school: "Universal Public School",
    degree: "Intermediate",
    startDate: "April 2021",
    endDate: "March 2023",
  },
];

// Projects
export const PROJECTS: Project[] = [
  {
    _id: "project-1",
    title: "CampusAlert",
    description: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "A Secure Campus Complaint Management System that enables students to easily report issues with detailed descriptions and attachments. Features real-time updates, role-based authentication, and instant notifications for efficient campus management.",
          },
        ],
      },
    ],
    technologies: ["React", "Node.js", "MongoDB", "Express.js", "TailwindCSS"],
    image: {
      asset: {
        url: "/projects/campus_alert.png",
      },
    },
    links: [
      {
        title: "github",
        url: "https://github.com/prashantmauryaa",
        type: "code",
      },
      {
        title: "Live Demo",
        url: "https://campus-alert.vercel.app/",
        type: "demo",
      },
    ],
  },
  {
    _id: "project-2",
    title: "Hostel Legends",
    description: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "A nostalgic hostel memories website celebrating the Batch 2024-28. Features profiles of hostel mates with their memorable quotes, scribbled nights stories, shared Maggi moments, and unlimited Wi-Fi fights memories preserved forever.",
          },
        ],
      },
    ],
    technologies: ["HTML", "CSS", "JavaScript", "React"],
    image: {
      asset: {
        url: "/projects/hostel_legends.png",
      },
    },
    links: [
      {
        title: "github",
        url: "https://github.com/prashantmauryaa",
        type: "code",
      },
      {
        title: "Live Demo",
        url: "https://hostelxwall.netlify.app/",
        type: "demo",
      },
    ],
  },
];

