/**
 * Represents a professional work experience entry for the experience timeline.
 *
 * Used to display work history with role details, company information, and technologies used.
 */
export interface WorkExperience {
  /** Job title or role name */
  role: string;

  /** Date range of employment (e.g., "Jan 2023 - Present", "May 2022 - Dec 2022") */
  dateWorked: string;

  /** Company or organization name */
  company: string;

  /** Detailed description of responsibilities and achievements in the role */
  description: string;

  /** Array of technologies, tools, and skills used in this role */
  skills: string[];

  /** URL or path to the company logo image */
  logoSrc: string;

  /** Optional additional context or notes about the experience */
  additionalInfo?: string;
}
