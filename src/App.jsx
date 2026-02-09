import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import BlogList from './pages/Blog/BlogList';
import BlogTopicPage from './pages/Blog/BlogTopicPage';
import About from './pages/About/About';

function App() {
  return (
    <ThemeProvider>
      <Router basename="/">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/react" element={<BlogTopicPage title="React & Web Development" topicKey="react" description="Deep dives into React hooks, component architecture, and modern web performance." />} />
            <Route path="/blog/python" element={<BlogTopicPage title="Python & AI" topicKey="python" description="Exploring Machine Learning, Data Science libraries, and core Python concepts." />} />
            <Route path="/blog/github" element={<BlogTopicPage title="GitHub Guide" topicKey="github" description="Essential guide to version control, repository management, and collaboration." />} />
            <Route path="/blog/programming" element={<BlogTopicPage title="Learning Roadmap" topicKey="programming" description="Strategies and roadmaps for effectively learning to code as a beginner." />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
