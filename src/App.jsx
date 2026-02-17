import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout/Layout';

// Lazy-load all page components for code splitting
const Home = lazy(() => import('./pages/Home/Home'));
const BlogList = lazy(() => import('./pages/Blog/BlogList'));
const BlogTopicPage = lazy(() => import('./pages/Blog/BlogTopicPage'));
const BlogPost = lazy(() => import('./pages/Blog/BlogPost'));
const About = lazy(() => import('./pages/About/About'));

// Minimal loading fallback
const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    color: 'var(--text-muted)',
    fontSize: '1rem',
  }}>
    Loading...
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <Router basename="/">
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/react" element={<BlogTopicPage title="React & Web Development" topicKey="react" description="Deep dives into React hooks, component architecture, and modern web performance." />} />
              <Route path="/blog/python" element={<BlogTopicPage title="Python & AI" topicKey="python" description="Exploring Machine Learning, Data Science libraries, and core Python concepts." />} />
              <Route path="/blog/github" element={<BlogTopicPage title="GitHub Guide" topicKey="github" description="Essential guide to version control, repository management, and collaboration." />} />
              <Route path="/blog/programming" element={<BlogTopicPage title="Learning Roadmap" topicKey="programming" description="Strategies and roadmaps for effectively learning to code as a beginner." />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
