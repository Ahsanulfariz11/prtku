import { StrictMode, useState, useEffect, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Lazy load components to keep initial bundle small
const App = lazy(() => import('./App.jsx'));
const Admin = lazy(() => import('./Admin.jsx'));

// Loading component for Suspense
const PageLoader = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignSelf: 'center', 
    height: '100vh', 
    alignItems: 'center',
    background: '#F0F9FF'
  }}>
    <div className="w-12 h-12 border-4 border-[#0EA5E9] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function Router() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <Suspense fallback={<PageLoader />}>
      {route === '#/admin' ? <Admin /> : <App />}
    </Suspense>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
