/**
 * Represents a portfolio project with metadata and display information.
 *
 * Used to showcase personal or professional projects in the portfolio section.
 */
export interface Project {
  /** Display name of the project */
  name: string;

  /** Detailed description of the project and its purpose */
  description: string;

  /** URL or path to the project thumbnail/preview image */
  imageUrl: string;

  /** Optional icon URL for the external link (e.g., GitHub icon, demo icon) */
  linkIconSrc?: string;

  /** Optional external link to project demo, repository, or documentation */
  link?: string;

  /** Array of technology/skill tags associated with the project (e.g., ["React", "TypeScript"]) */
  skills: string[]

  /** Optional award or recognition information (e.g., "1st place at HackTX 2021") */
  prize?: string;
}