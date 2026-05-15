const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3003;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const members = [
  {
    id: 1,
    slug: "member-one",
    name: "Kerr Laurence B. Bermudez",
    role: "Frontend Developer",
    tagline: "Pixel-sharp interfaces with fast, accessible interactions.",
    image: "/images/members/member1.jpg",
    bio:
      "A frontend developer focused on translating design systems into fast, accessible, and polished web experiences.",
    skills: [
      { name: "Responsive UI", level: 96 },
      { name: "CSS Architecture", level: 92 },
      { name: "Accessibility", level: 88 },
      { name: "Motion UI", level: 84 }
    ],
    programmingLanguages: ["HTML", "CSS", "JavaScript", "TypeScript"],
    projects: ["Responsive Landing Page", "Component Library", "Portfolio Redesign"],
    achievements: ["HTML/CSS Excellence Badge", "JavaScript Fundamentals Certificate"],
    email: "member.one@example.com",
    phone: "+1 555 0101",
    socialLinks: {
      GitHub: "https://github.com/",
      LinkedIn: "https://linkedin.com/",
      Dribbble: "https://dribbble.com/"
    }
  },
  {
    id: 2,
    slug: "member-two",
    name: "Eugene L. Albania",
    role: "Backend Developer",
    tagline: "Reliable APIs, clean server logic, and practical data flows.",
    image: "/images/members/member2.jpg",
    bio:
      "A backend developer who builds reliable server-side systems, clean API routes, and practical database workflows.",
    skills: [
      { name: "REST APIs", level: 94 },
      { name: "Express.js", level: 91 },
      { name: "Auth Flows", level: 86 },
      { name: "Data Modeling", level: 82 }
    ],
    programmingLanguages: ["JavaScript", "Node.js", "SQL", "Python"],
    projects: ["Inventory API", "Authentication System", "Data Dashboard"],
    achievements: ["Node.js API Certificate", "Database Design Workshop"],
    email: "member.two@example.com",
    phone: "+1 555 0102",
    socialLinks: {
      GitHub: "https://github.com/",
      LinkedIn: "https://linkedin.com/",
      Portfolio: "https://example.com/"
    }
  },
  {
    id: 3,
    slug: "member-three",
    name: "Kyle Joros Sibonga",
    role: "UI/UX Designer",
    tagline: "Product flows, prototypes, and visual systems that feel natural.",
    image: "/images/members/member3.jpg",
    bio:
      "A UI/UX designer who turns research, wireframes, and prototypes into elegant product flows that feel easy to use.",
    skills: [
      { name: "Figma", level: 95 },
      { name: "Wireframing", level: 90 },
      { name: "Design Systems", level: 88 },
      { name: "User Research", level: 83 }
    ],
    programmingLanguages: ["HTML", "CSS", "Design Tokens", "No-Code Prototyping"],
    projects: ["Mobile App Prototype", "User Flow Study", "Design System Kit"],
    achievements: ["Figma Essentials Certificate", "UX Research Sprint Lead"],
    email: "member.three@example.com",
    phone: "+1 555 0103",
    socialLinks: {
      Behance: "https://behance.net/",
      LinkedIn: "https://linkedin.com/",
      Dribbble: "https://dribbble.com/"
    }
  },
  {
    id: 4,
    slug: "member-four",
    name: " James Lester Moncerina",
    role: "Project Manager",
    tagline: "Clear roadmaps, calm delivery, and documentation that keeps teams moving.",
    image: "/images/members/member4.jpg",
    bio:
      "A project manager who keeps work organized through thoughtful planning, documentation, and communication.",
    skills: [
      { name: "Sprint Planning", level: 92 },
      { name: "Documentation", level: 94 },
      { name: "Communication", level: 90 },
      { name: "Risk Tracking", level: 84 }
    ],
    programmingLanguages: ["Markdown", "SQL Basics", "Analytics", "Workflow Automation"],
    projects: ["Sprint Roadmap", "Team Wiki", "Project Presentation"],
    achievements: ["Agile Project Management Badge", "Best Documentation Award"],
    email: "member.four@example.com",
    phone: "+1 555 0104",
    socialLinks: {
      LinkedIn: "https://linkedin.com/",
      Notion: "https://notion.so/",
      Portfolio: "https://example.com/"
    }
  },
  {
    id: 5,
    slug: "member-five",
    name: "Aaron Bernal",
    role: "Full-Stack Developer",
    tagline: "End-to-end product builds from UI to deployment.",
    image: "/images/members/member5.jpg",
    bio:
      "A full-stack developer comfortable moving from interface details to backend routes, deployment, and optimization.",
    skills: [
      { name: "Full-Stack Builds", level: 93 },
      { name: "Database Integration", level: 86 },
      { name: "Deployment", level: 88 },
      { name: "Performance", level: 84 }
    ],
    programmingLanguages: ["JavaScript", "Node.js", "SQL", "HTML/CSS"],
    projects: ["Full-Stack Booking App", "Admin Portal", "Cloud Deployment"],
    achievements: ["Full-Stack Web Certificate", "Deployment Automation Badge"],
    email: "member.five@example.com",
    phone: "+1 555 0105",
    socialLinks: {
      GitHub: "https://github.com/",
      LinkedIn: "https://linkedin.com/",
      Portfolio: "https://example.com/"
    }
  }
];

const projects = [
  {
    title: "Team Portfolio Platform",
    category: "Group",
    owner: "All Members",
    description:
      "A premium multi-page portfolio with animated member profiles, project cards, contact handling, and responsive navigation.",
    technologies: ["Node.js", "Express", "EJS", "CSS", "JavaScript"]
  },
  {
    title: "Responsive UI Kit",
    category: "Frontend",
    owner: "Member One",
    description:
      "Reusable interface components for cards, navigation, forms, and dashboards built with accessibility in mind.",
    technologies: ["HTML", "CSS", "JavaScript"]
  },
  {
    title: "Student Records API",
    category: "Backend",
    owner: "Member Two",
    description:
      "An Express API concept for student records, search, validation, and secure routing patterns.",
    technologies: ["Node.js", "Express", "Database"]
  },
  {
    title: "Mobile App Prototype",
    category: "UI/UX Design",
    owner: "Member Three",
    description:
      "A high-fidelity app prototype showing onboarding, dashboard states, and a modern interaction system.",
    technologies: ["Figma", "Wireframes", "Prototype"]
  },
  {
    title: "Launch Plan Dashboard",
    category: "Project Management",
    owner: "Member Four",
    description:
      "A planning dashboard concept for timelines, responsibilities, documentation, and weekly progress.",
    technologies: ["Planning", "Docs", "Kanban"]
  },
  {
    title: "Deployment Ready App",
    category: "Full-Stack",
    owner: "Member Five",
    description:
      "A full-stack application concept prepared for hosting, environment configuration, and production checks.",
    technologies: ["Frontend", "Backend", "Deployment"]
  }
];

const skillCategories = [
  {
    title: "Frontend",
    description: "Interfaces, responsive systems, accessibility, and interactive browser experiences.",
    skills: ["HTML", "CSS", "JavaScript", "Responsive Design", "Animation"]
  },
  {
    title: "Backend",
    description: "Server routes, API design, validation, authentication patterns, and clean data exchange.",
    skills: ["Node.js", "Express.js", "REST APIs", "Middleware", "Validation"]
  },
  {
    title: "UI/UX Design",
    description: "Research-backed flows, wireframes, prototypes, and polished visual systems.",
    skills: ["Figma", "Wireframing", "Prototyping", "Design Systems", "Usability"]
  },
  {
    title: "Database",
    description: "Structured records, schema planning, reporting views, and practical database workflows.",
    skills: ["SQL", "Data Modeling", "CRUD", "Queries", "Relationships"]
  },
  {
    title: "Project Management",
    description: "Planning, communication, documentation, ownership, and clear presentation delivery.",
    skills: ["Agile", "Kanban", "Documentation", "Roadmaps", "Presentations"]
  }
];

const renderPage = (res, view, pageTitle, activePage, data = {}) => {
  res.render(view, {
    pageTitle,
    activePage,
    members,
    projects,
    skillCategories,
    ...data
  });
};

app.get("/", (req, res) => {
  renderPage(res, "index", "Dev Collective | Home", "home");
});

app.get("/team", (req, res) => {
  renderPage(res, "team", "Our Team | Dev Collective", "team");
});

app.get("/projects", (req, res) => {
  renderPage(res, "projects", "Projects | Dev Collective", "projects");
});

app.get("/skills", (req, res) => {
  renderPage(res, "skills", "Skills | Dev Collective", "skills");
});

app.get("/about", (req, res) => {
  renderPage(res, "about", "About | Dev Collective", "about");
});

app.get("/contact", (req, res) => {
  renderPage(res, "contact", "Contact | Dev Collective", "contact");
});

app.get("/member/:id", (req, res) => {
  const member = members.find((item) => String(item.id) === req.params.id || item.slug === req.params.id);

  if (!member) {
    return res.status(404).render("member", {
      pageTitle: "Member Not Found | Dev Collective",
      activePage: "team",
      member: null,
      members,
      projects: [],
      skillCategories
    });
  }

  const memberProjects = projects.filter(
    (project) => project.owner === member.name || project.owner === "All Members"
  );

  return res.render("member", {
    pageTitle: `${member.name} | ${member.role}`,
    activePage: "team",
    member,
    members,
    projects: memberProjects,
    skillCategories
  });
});

app.get("/members/:slug", (req, res) => {
  const member = members.find((item) => item.slug === req.params.slug);
  return member ? res.redirect(`/member/${member.id}`) : res.redirect("/team");
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !emailPattern.test(email || "") || !message || message.length < 10) {
    return res.status(400).json({
      ok: false,
      message: "Please provide a valid name, email, and message of at least 10 characters."
    });
  }

  return res.json({
    ok: true,
    message: "Message received. The team will get back to you soon."
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
