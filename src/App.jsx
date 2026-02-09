import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import BlogList from './pages/Blog/BlogList';
import ReactBlog from './pages/Blog/ReactBlog';
import PythonBlog from './pages/Blog/PythonBlog';
import About from './pages/About/About';

function App() {
  return (
    <ThemeProvider>
      <Router basename="/">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/react" element={<ReactBlog />} />
            <Route path="/blog/python" element={<PythonBlog />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
