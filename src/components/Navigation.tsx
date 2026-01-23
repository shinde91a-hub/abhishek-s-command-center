import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, FileText, Briefcase, Mail, Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'About', path: '/#about', icon: User },
  { name: 'Principles', path: '/#principles', icon: FileText },
  { name: 'Decision Logs', path: '/#decisions', icon: Briefcase },
  { name: 'Contact', path: '/#contact', icon: Mail },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    setIsMobileOpen(false);
    if (path.includes('#')) {
      const id = path.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Desktop Side Navigation */}
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2"
      >
        <div className="glass-card py-4 px-3 rounded-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
              (item.path.includes('#') && location.hash === `#${item.path.split('#')[1]}`);

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`group flex items-center gap-3 py-3 px-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-accent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className={`text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${
                  isActive ? 'max-w-24 opacity-100' : 'max-w-0 opacity-0 group-hover:max-w-24 group-hover:opacity-100'
                }`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </motion.nav>

      {/* Mobile Top Bar */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 right-0 z-50 lg:hidden transition-all duration-300 ${
          isScrolled ? 'glass-card border-b border-border' : ''
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <Link to="/" className="font-semibold text-lg text-foreground">
            AS
          </Link>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div 
              className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-card shadow-lg p-6 pt-20"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => handleNavClick(item.path)}
                      className="flex items-center gap-4 py-4 px-4 rounded-xl hover:bg-accent text-foreground transition-colors"
                    >
                      <Icon className="w-5 h-5 text-primary" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;