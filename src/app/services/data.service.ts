import { Injectable } from '@angular/core';
import { WorkExperience } from '../interfaces/work-experience';
import { Project } from '../interfaces/project';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  workExperiences: WorkExperience[] = [
    {
      role: 'Machine Learning Engineering Intern',
      dateWorked: 'May 2024 - Present',
      company: 'IBM Consulting',
      logoSrc: 'assets/images/ibmLogo.svg',
      description:
        'Creating a cloud agnostic and open-source LLMOps infrastructure framework using Kubernetes that will allow LLM developers to create end-to-end projects on our platform through Kubeflow, MLFlow, Langserve, Graphana and more.',
      skills: [
        'Kubernetes',
        'Python',
        'Langchain',
        'Langserve',
        'Kubeflow',
        'MLFLow',
        'GO-CD',
        'Azure',
        'Graphana'
      ],
    },
    {
      role: 'Data Science Intern',
      dateWorked: 'Jan 2024 - Apr 2024',
      company: 'IBM Consulting',
      logoSrc: 'assets/images/ibmLogo.svg',
      description:
        'Created a multi-step LLM Agent that is able to answer questions for the client combining information from several pdf files and excel files. Additionally worked on developing code conversion LLM agents on converting legacy Java Struts2 code to Springboot.',
      skills: [
        'Python',
        'Langchain',
        'Langgraph',
        'LLMs',
        'Google Vertex AI',
      ],
    },
    {
      role: 'Frontend Developer',
      dateWorked: 'May 2023 - Aug 2023',
      company: 'LogicomUSA',
      logoSrc: 'assets/images/logicomUSAlogo.jpeg',
      description:
        "Built several frontend pages of LogicomUSA's call management software with Vue.js and AWS. The app is being currently used by Logicom's internal and external clients.",
      skills: ['Vue.js', 'Node.js', 'CSS', 'AWS Cloud'],
    },
    {
      role: 'Software Developer',
      additionalInfo: 'Project Lead',
      dateWorked: 'Jan 2023 - May 2023',
      company: 'Bits of Good @ Georgia Tech',
      logoSrc: 'assets/images/bitsOfGoodlogo.jpeg',
      description:
        'Led a team of 4 developers, 2 designers alongside a product manager to create an app for the non-profit Southface making it easy to search, filter and compile sustainable building standards.',
      skills: [
        'Next.js',
        'ChakraUI',
        'MongoDB',
        'Azure Blob Storage',
        'Javascript',
      ],
    },

    {
      role: 'Software Engineering Intern',
      dateWorked: 'May 2022 - Aug 2022',
      company: 'NCR Corporation',
      logoSrc: 'assets/images/ncrLogo.png',
      description:
        "Developed a frontend settings page for NCR's new Point-of-Sale software for restaurants through React.js. Also implemented Apple Pay, Google Pay and PayPal in the backend of the software using Nest.js and FreedomPay APIs.",
      skills: [
        'React.js',
        'Node.js',
        'Nest.js',
        'RestAPIs',
        'GraphQL',
        'Redux',
        'Typescript',
      ],
    },
  ];

  projects: Project[] = [
    {
      name: 'TinyGen: An LLM Coding Agent',
      description:
        "Created an LLM agent that can create pull requests through natural language prompts given any Github repository.",
      imageUrl: 'assets/images/tinygen-thumbnail.png',
      skills: [
        'Python',
        'Langchain',
        'FastAPI',
        'Docker',
        'Google Cloud Platform',
        'Streamlit',
      ],
      linkIconSrc: 'assets/images/youtubeIcon.svg',
      link: 'https://tiny-gen.streamlit.app/',
    },
    {
      name: 'Deep Q-Learning RL Agent Balances a Pole',
      description:
        "Implemented a Deep-Q-Learning Reinforcement Learning Agent on OpenAI Gym's cartpole environment.",
      imageUrl: 'assets/images/DeepQLearningThumbnail.png',
      skills: [
        'Reinforcement Learning',
        'Pytorch',
        'Python',
        'Open AI Gym',
        'Machine Learning',
      ],
      linkIconSrc: 'assets/images/youtubeIcon.svg',
      link: 'https://youtu.be/vy2XsVGBaKE?si=8VLT_KUc1EeAuhdm',
    },
    {
      name: 'Monte Carlo RL Agent Plays Blackjack',
      description:
        'Implemented the Monte Carlo Reinforcment Learning algorithm to play the game of Blackjack.',
      imageUrl: 'assets/images/blackJackThumbnail.png',
      skills: [
        'Reinforcement Learning',
        'Numpy',
        'Python',
        'Open AI Gym',
        'Machine Learning',
      ],
      linkIconSrc: 'assets/images/youtubeIcon.svg',
      link: 'https://youtu.be/NeusGkowXR4?si=yhcjE3n9qrPiIXmB',
    },
    {
      name: 'Shoe Price Detection Using Computer Vision',
      description:
        'Trained a custom ResNet and VGG image classification model to to detect the price of a shoe using scraped images from several sites including Nike, Adidas, Puma and more.',
      imageUrl: 'assets/images/shoePriceDetectionThumbnail.png',
      skills: ['Pytorch', 'Python', 'Matplotlib', 'Machine Learning'],
      linkIconSrc: 'assets/images/linkIcon.png',
      link: 'https://emilioapontea.github.io/ML-Team-38/',
    },
    {
      name: 'Robot Warehouse Automation',
      description:
        'Created a robot to explore, locate and retreive items in a simulated warehouse using Frontier Planning for exploration, RRT for path planning and PID controllers for control.',
      imageUrl: 'assets/images/robotThumbnail.png',
      skills: ['Robotics', 'Python', 'Numpy', 'Matplotlib'],
      linkIconSrc: 'assets/images/youtubeIcon.svg',
      link: 'https://www.loom.com/share/22741d4244ee4ecfa7412059e6b43687?sid=2a06fae0-210a-4acf-bc49-388e40c6ea27',
    },
    {
      name: 'DayMaker',
      description:
        'A syllabus-to-calendar application that schedules calendar events based on lecture & exam information detected on the syllabus using NLP.',
      imageUrl: 'assets/images/daymakerThumbnail.webp',
      skills: [
        'MongoDB',
        'React.js',
        'Javascript',
        'Express.js',
        'Google Cloud',
        'Google Vertex AI',
        'SQL',
      ],
      linkIconSrc: 'assets/images/youtubeIcon.svg',
      link: 'https://youtu.be/zPkha5Db5sI?si=liQOyEYqJAPVOVVA',
      prize: "1st place Google Cloud's sponsor prize @ HackTX 2021",
    },
    {
      name: 'TawsifCoin',
      description:
        "Made a full-stack web app of my 'fake' crypto coin to learn the ideas behind blockchain such as a elliptic hash functions, SHA256, Proof of Work and more.",
      imageUrl: 'assets/images/tawsifCoinThumbnail.png',
      skills: [
        'Next.js',
        'ChakraUI',
        'Blockchain',
        'MongoDB',
        'React.js',
        'Node.js',
        'Javascript',
      ],
      linkIconSrc: 'assets/images/linkIcon.png',
      link: 'https://tawsifcoin.vercel.app/',
    },
  ];

  articles: Article[] = [
    {
      name: 'An Intuitive Approach To Linear Regression',
      link: 'https://medium.com/swlh/an-intuitive-approach-to-linear-regression-b127da628e45',
    },
    {
      name: 'A Brief Introduction To Classification',
      link: 'https://medium.com/swlh/a-brief-introduction-to-classification-619d38f4880f',
    },
    {
      name: 'An Intuitive Approach To Q-Learning',
      link: 'https://medium.com/swlh/an-intuitive-approach-to-q-learning-p1-acedb6dff968',
    },
    {
      name: 'Hands On Approach To Monte-Carlo Learning',
      link: 'https://medium.com/@tawsifkamal/monte-carlo-reinforcement-learning-a-hands-on-approach-97b412b48293',
    },
  ];

  constructor() { }
}
