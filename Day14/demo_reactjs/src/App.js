import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, Suspense, lazy } from 'react';
import Home from './pages/Home';
import ErrorBoundary from './components/ErrorBoundary';
import PortalHost from './components/PortalHost';

// Lazy load the heavy component
const HeavyPage = lazy(() => import('./pages/HeavyPage'));

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [time, setTime] = useState(new Date());
  const [count, setCount] = useState(0);
  const [pureComponentProps, setPureComponentProps] = useState({
    title: 'Initial Title',
    count: 0
  });

  // Clock to demonstrate unnecessary re-renders
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case 'lazy':
        return (
          <Suspense fallback={<div className="loading">Loading Heavy Component...</div>}>
            <HeavyPage />
          </Suspense>
        );
      case 'pure':
        return (
          <div className="demo-section">
            <h3>Pure Component Demo</h3>
            <p>Parent component updates every second, but PureDisplay only re-renders when props change</p>
            <div className="counter-controls">
              <button className="btn" onClick={() => setCount(c => c + 1)}>
                Increment Parent Counter: {count}
              </button>
              <button className="btn" onClick={() => setPureComponentProps(prev => ({
                ...prev,
                count: prev.count + 1
              }))}>
                Change Pure Component Props
              </button>
              <button className="btn" onClick={() => setPureComponentProps(prev => ({
                title: prev.title === 'Initial Title' ? 'Updated Title' : 'Initial Title',
                count: prev.count
              }))}>
                Toggle Title
              </button>
            </div>
            {/* PureDisplay will be imported dynamically to avoid circular dependency */}
            <Suspense fallback={<div>Loading PureDisplay...</div>}>
              <PureDisplayWrapper 
                title={pureComponentProps.title} 
                count={pureComponentProps.count} 
              />
            </Suspense>
          </div>
        );
      case 'error':
        return (
          <div className="demo-section">
            <h3>Error Boundary Demo</h3>
            <p>Click the button below to trigger an error that will be caught by the Error Boundary</p>
            <ErrorBoundary>
              <ErrorProneComponent />
            </ErrorBoundary>
          </div>
        );
      case 'portal':
        return (
          <div className="demo-section">
            <h3>Portal Demo</h3>
            <p>Modal will be rendered outside the component hierarchy using React Portal</p>
            <PortalDemo />
          </div>
        );
      default:
        return <Home />;
    }
  };

  return (
    <div className="container">
      <nav className="nav">
        <h1>React Performance & Patterns Demo</h1>
        <div className="nav-buttons">
          <button 
            className={`btn ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => setCurrentView('home')}
          >
            Home
          </button>
          <button 
            className={`btn ${currentView === 'lazy' ? 'active' : ''}`}
            onClick={() => setCurrentView('lazy')}
          >
            Lazy Load
          </button>
          <button 
            className={`btn ${currentView === 'pure' ? 'active' : ''}`}
            onClick={() => setCurrentView('pure')}
          >
            Pure Component
          </button>
          <button 
            className={`btn ${currentView === 'error' ? 'active' : ''}`}
            onClick={() => setCurrentView('error')}
          >
            Error Boundary
          </button>
          <button 
            className={`btn ${currentView === 'portal' ? 'active' : ''}`}
            onClick={() => setCurrentView('portal')}
          >
            Portal (Modal)
          </button>
        </div>
        <div className="clock">
          Parent component update time: {time.toLocaleTimeString()}
        </div>
      </nav>

      <main className="content">
        {renderContent()}
      </main>

      <PortalHost />
    </div>
  );
}

// Component that can throw an error for Error Boundary demo
function ErrorProneComponent() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error('This is a simulated error for demo purposes!');
  }

  return (
    <button 
      className="btn error-button"
      onClick={() => setShouldError(true)}
    >
      Trigger Error
    </button>
  );
}

// Component to demonstrate portal usage
function PortalDemo() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button className="btn" onClick={() => setShowModal(true)}>
        Open Modal via Portal
      </button>
      {showModal && (
        <ModalPortal onClose={() => setShowModal(false)}>
          <h2>Modal Title</h2>
          <p>This modal is rendered using React Portal outside the normal component hierarchy!</p>
          <button className="btn" onClick={() => setShowModal(false)}>
            Close Modal
          </button>
        </ModalPortal>
      )}
    </div>
  );
}

// Import components that might cause circular dependencies
const ModalPortal = lazy(() => import('./components/ModalPortal'));
const PureDisplay = lazy(() => import('./components/PureDisplay'));

// Wrapper for PureDisplay to handle the lazy import
function PureDisplayWrapper(props) {
  return <PureDisplay {...props} />;
}


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
