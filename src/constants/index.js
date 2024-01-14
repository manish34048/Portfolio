import { highradius, nineleaps } from "../assets/images";
import {
    contact,
    css,
    express,
    git,
    github,
    html,
    javascript,
    linkedin,
    mongodb,
    motion,
    mui,
    nextjs,
    nodejs,
    medicine,
    react,
    redux,
    sass,
    snapgram,
    summiz,
    tailwindcss,
    threads,
    typescript,
    movie
} from "../assets/icons";

export const skills = [
    {
        imageUrl: css,
        name: "CSS",
        type: "Frontend",
    },
    {
        imageUrl: express,
        name: "Express",
        type: "Backend",
    },
    {
        imageUrl: git,
        name: "Git",
        type: "Version Control",
    },
    {
        imageUrl: github,
        name: "GitHub",
        type: "Version Control",
    },
    {
        imageUrl: html,
        name: "HTML",
        type: "Frontend",
    },
    {
        imageUrl: javascript,
        name: "JavaScript",
        type: "Frontend",
    },
    {
        imageUrl: mongodb,
        name: "MongoDB",
        type: "Database",
    },
    {
        imageUrl: motion,
        name: "Motion",
        type: "Animation",
    },
    {
        imageUrl: mui,
        name: "Material-UI",
        type: "Frontend",
    },
    {
        imageUrl: nextjs,
        name: "Next.js",
        type: "Frontend",
    },
    {
        imageUrl: nodejs,
        name: "Node.js",
        type: "Backend",
    },
    {
        imageUrl: react,
        name: "React",
        type: "Frontend",
    },
    {
        imageUrl: redux,
        name: "Redux",
        type: "State Management",
    },
    {
        imageUrl: sass,
        name: "Sass",
        type: "Frontend",
    },
    {
        imageUrl: tailwindcss,
        name: "Tailwind CSS",
        type: "Frontend",
    },
    {
        imageUrl: typescript,
        name: "TypeScript",
        type: "Frontend",
    }
];

export const experiences = [
    {
        title: "Summer Intern (Product and Engineering)",
        company_name: "HighRadius",
        icon: highradius,
        iconBg: "#f3b651",
        date: "June 2021 - July 2021",
        points: [
            "Full-stack web-based AI-enabled fintech B2B application.",
            "Used HTML5, CSS3, JavaScript and Bootstrap to build the attractive front end.",
            "Made Data Analytics model from scratch to output the desired efficient data used by the business team of the company for better results or profits.",
        ],
    },
    {
        title: "Member of technical staff-2",
        company_name: "Nineleaps",
        icon: nineleaps,
        iconBg: "#accbe1",
        date: "January 2022 - December 2023",
        points: [
            "Technologies used React Native/ React, javascript, typescript, HTML5/CSS3, SASS, Bootstrap, MUI, tailwind CSS, react native animation, Microservices, Rest API, SQL, JSON, XML, SpringBoot, RESTful web services, Kubernetes, Docker.",
            "Made the whole application offline by integrating sync API’s in the whole application.",
            "Implemented lottieview, Formik with Validation.",
            "Implemented S3 bucket in the application.",
            "Responsible for creating Figma designs for the projects from scratch.",
            "Agile Software Development.",
            "Experience with Google Firebase, Google Performance and Google Analytics including their use in resolving technical issues in the field.",
            "Responsible for creating Unit Test cases using Jest and React Test Renderer and making sure that all test coverage is more than 90 percent."
        ],
    }
];

export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: contact,
        link: '/contact',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/manish34048?tab=repositories',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/manishrajjammu/',
    }
];

export const projects = [
    {
        iconUrl: medicine,
        theme: 'btn-back-green',
        name: 'Medicine Adherence Application',
        description: 'Developed a React native mobile application which can be used to remind users about medicines to be taken on proper time. With this Application, a user can become a patient and caretaker as well and can remind his patient about medicine to be taken on time.',
        link: 'https://github.com/manish34048/Medicine-Adherence-App',
    },
    {
        iconUrl: movie,
        theme: 'btn-back-red',
        name: 'Movie App',
        description: 'Created a movie browsing mobile application which helps users to browse different movies through this single application.',
        link: 'https://github.com/manish34048/movieApp',
    },

];