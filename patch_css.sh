sed -i '/.projects-section {/,/}/d' src/app/app.component.css
sed -i '/.project-cards-container {/,/}/d' src/app/app.component.css
sed -i '/.project-card {/,/}/d' src/app/app.component.css
sed -i '/.project-card:hover {/,/}/d' src/app/app.component.css
sed -i '/.project-title {/,/}/d' src/app/app.component.css
sed -i '/.project-description {/,/}/d' src/app/app.component.css
sed -i '/.project-link {/,/}/d' src/app/app.component.css

cat << 'INNER_EOF' >> src/app/project-section/project-section.component.css
.projects-section {
  margin-top: 4rem;
}

.project-cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.project-card {
  display: block; /* Makes the whole card clickable */
  text-decoration: none;
  color: var(--primary-text-color);
  background-color: var(--card-background-color, #1a1a1a); /* Assuming a dark mode site */
  border: 1px solid var(--border-color, #333);
  border-radius: 8px;
  padding: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s ease-in-out;
}

.project-card:hover {
  transform: translateY(-5px);
  border-color: var(--tertiary-text-color); /* Highlight color on hover */
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.project-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--secondary-text-color);
  margin-top: 0;
  margin-bottom: 10px;
}

.project-description {
  font-size: 1rem;
  color: var(--primary-text-color);
  margin-bottom: 15px;
}

.project-link {
  display: inline-block;
  font-weight: 500;
  color: var(--tertiary-text-color);
}
INNER_EOF
