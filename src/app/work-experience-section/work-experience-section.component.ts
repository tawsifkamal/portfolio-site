import { Component } from '@angular/core';
import { WorkExperienceCardComponent } from './work-experience-card/work-experience-card.component';
import { WorkExperience } from '../interfaces/work-experience';
import { ScreenSizeService } from '../services/screen-size.service';

@Component({
  selector: 'app-work-experience-section',
  standalone: true,
  imports: [WorkExperienceCardComponent],
  templateUrl: 'work-experience-section.component.html',
  styleUrl: './work-experience-section.component.css',
})
export class WorkExperienceSectionComponent {

  constructor(public screen: ScreenSizeService) {}

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
}
