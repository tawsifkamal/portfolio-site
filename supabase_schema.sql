-- SQL Migration for Portfolio Projects

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  link_icon_src TEXT,
  link TEXT,
  skills TEXT[] NOT NULL,
  prize TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create public read policy
CREATE POLICY "Public read access" ON projects FOR SELECT USING (true);

-- Seed data
INSERT INTO projects (name, description, image_url, link_icon_src, link, skills, prize) VALUES
('TinyGen: An LLM Coding Agent', 'Created an LLM agent that can create pull requests through natural language prompts given any Github repository.', 'assets/images/tinygen-thumbnail.png', 'assets/images/youtubeIcon.svg', 'https://tiny-gen.streamlit.app/', ARRAY['Python', 'Langchain', 'FastAPI', 'Docker', 'Google Cloud Platform', 'Streamlit'], NULL),
('Deep Q-Learning RL Agent Balances a Pole', 'Implemented a Deep-Q-Learning Reinforcement Learning Agent on OpenAI Gym''s cartpole environment.', 'assets/images/DeepQLearningThumbnail.png', 'assets/images/youtubeIcon.svg', 'https://youtu.be/vy2XsVGBaKE?si=8VLT_KUc1EeAuhdm', ARRAY['Reinforcement Learning', 'Pytorch', 'Python', 'Open AI Gym', 'Machine Learning'], NULL),
('Monte Carlo RL Agent Plays Blackjack', 'Implemented the Monte Carlo Reinforcment Learning algorithm to play the game of Blackjack.', 'assets/images/blackJackThumbnail.png', 'assets/images/youtubeIcon.svg', 'https://youtu.be/NeusGkowXR4?si=yhcjE3n9qrPiIXmB', ARRAY['Reinforcement Learning', 'Numpy', 'Python', 'Open AI Gym', 'Machine Learning'], NULL),
('Shoe Price Detection Using Computer Vision', 'Trained a custom ResNet and VGG image classification model to to detect the price of a shoe using scraped images from several sites including Nike, Adidas, Puma and more.', 'assets/images/shoePriceDetectionThumbnail.png', 'assets/images/linkIcon.png', 'https://emilioapontea.github.io/ML-Team-38/', ARRAY['Pytorch', 'Python', 'Matplotlib', 'Machine Learning'], NULL),
('Robot Warehouse Automation', 'Created a robot to explore, locate and retreive items in a simulated warehouse using Frontier Planning for exploration, RRT for path planning and PID controllers for control.', 'assets/images/robotThumbnail.png', 'assets/images/youtubeIcon.svg', 'https://www.loom.com/share/22741d4244ee4ecfa7412059e6b43687?sid=2a06fae0-210a-4acf-bc49-388e40c6ea27', ARRAY['Robotics', 'Python', 'Numpy', 'Matplotlib'], NULL),
('DayMaker', 'A syllabus-to-calendar application that schedules calendar events based on lecture & exam information detected on the syllabus using NLP.', 'assets/images/daymakerThumbnail.webp', 'assets/images/youtubeIcon.svg', 'https://youtu.be/zPkha5Db5sI?si=liQOyEYqJAPVOVVA', ARRAY['MongoDB', 'React.js', 'Javascript', 'Express.js', 'Google Cloud', 'Google Vertex AI', 'SQL'], '1st place Google Cloud''s sponsor prize @ HackTX 2021'),
('TawsifCoin', 'Made a full-stack web app of my ''fake'' crypto coin to learn the ideas behind blockchain such as a elliptic hash functions, SHA256, Proof of Work and more.', 'assets/images/tawsifCoinThumbnail.png', 'assets/images/linkIcon.png', 'https://tawsifcoin.vercel.app/', ARRAY['Next.js', 'ChakraUI', 'Blockchain', 'MongoDB', 'React.js', 'Node.js', 'Javascript'], NULL)
ON CONFLICT DO NOTHING;
