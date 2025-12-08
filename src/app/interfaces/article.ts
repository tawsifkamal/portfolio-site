/**
 * Represents a published article or blog post.
 *
 * Used to display links to external publications, blog posts, or technical articles.
 */
export interface Article {
  /** Title or display name of the article */
  name: string;

  /** External URL link to the full article (e.g., Medium, personal blog, etc.) */
  link: string;
}
