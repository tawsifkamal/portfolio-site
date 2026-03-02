/**
 * Interface for representing a project.
 */
export interface Project {
  /**
   * The name of the project.
   */
  name: string;
  /**
   * The description of the project.
   */
  description: string;
  /**
   * The URL of the project's image.
   */
  imageUrl: string;
  /**
   * The source of the link icon.
   */
  linkIconSrc?: string;
  /**
   * The link to the project.
   */
  link?: string;
  /**
   * The skills used in the project.
   */
  skills: string[]
  /**
   * The prize won by the project.
   */
  prize?: string;
}