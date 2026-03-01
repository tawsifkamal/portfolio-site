import { Injectable, signal } from '@angular/core';
import { Project } from '../interfaces/project';
import { Article } from '../interfaces/article';
import { WorkExperience } from '../interfaces/work-experience';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  projects = signal<Project[]>([
    {
      name: 'DevBox CLI',
      description:
        'An AI-powered CLI that provisions cloud VMs and runs coding agents',
      imageUrl: '', // Will be optional later
      link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      skills: [],
    },
    {
      name: 'LLM Orchestrator',
      description: 'Kubernetes-based framework for deploying LLM pipelines',
      imageUrl: '',
      link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      skills: [],
    },
    {
      name: 'Portfolio Site',
      description: 'Angular portfolio with automated deployments',
      imageUrl: '',
      link: 'https://github.com/tawsifkamal/portfolio-site',
      skills: [],
    },
  ]);

  articles = signal<Article[]>([
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
  ]);

  workExperiences = signal<WorkExperience[]>([
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
        'Graphana',
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
  ]);
}
