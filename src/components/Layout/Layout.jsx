import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import BackToTop from '../BackToTop/BackToTop';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <a href="#main-content" className={styles.skipLink}>
        Skip to main content
      </a>
      <Sidebar />
      <div className={styles.mainWrapper}>
        <main id="main-content" className={styles.main}>
          {children}
        </main>
        <Footer />
      </div>
      <BackToTop />
    </div>
  );
};

export default Layout;
