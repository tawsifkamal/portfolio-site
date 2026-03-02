/**
 * Interface for representing a work experience.
 */
export interface WorkExperience {
  /**
   * The role of the work experience.
   */
  role: string;
  /**
   * The date worked of the work experience.
   */
  dateWorked: string;
  /**
   * The company of the work experience.
   */
  company: string;
  /**
   * The description of the work experience.
   */
  description: string;
  /**
   * The skills used in the work experience.
   */
  skills: string[];
  /**
   * The source of the logo.
   */
  logoSrc: string;
  /**
   * Additional information about the work experience.
   */
  additionalInfo?: string;
}
