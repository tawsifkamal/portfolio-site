import { Component } from '@angular/core';
import { ProjectCardComponent } from './project-card/project-card.component';
import { Project } from '../interfaces/project';
import { CommonModule } from '@angular/common';
import { ScreenSizeService } from '../services/screen-size.service';

@Component({
  selector: 'app-project-section',
  standalone: true,
  imports: [ProjectCardComponent, CommonModule],
  templateUrl: './project-section.component.html',
  styleUrl: './project-section.component.css',
})
export class ProjectSectionComponent {
  constructor(public screen: ScreenSizeService) {}

  hoveredProject: string | null = null;
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
}
