import React from 'react';

function Home() {
  return (
    <div>
      <h2>Welcome to React Performance & Patterns Demo</h2>
      <p>This application demonstrates modern React patterns to solve common web application challenges:</p>
      
      <div className="demo-section">
        <h3>🚀 Lazy Loading & Code Splitting</h3>
        <p>Reduces initial bundle size by loading components only when needed</p>
        <ul>
          <li>Faster initial page load</li>
          <li>Better performance for large applications</li>
          <li>Check Network tab to see chunks loading</li>
        </ul>
      </div>

      <div className="demo-section">
        <h3>⚡ Pure Components</h3>
        <p>Prevents unnecessary re-renders with React.memo and PureComponent</p>
        <ul>
          <li>Automatic shallow prop comparison</li>
          <li>Reduced rendering overhead</li>
          <li>Better performance in frequently updating components</li>
        </ul>
      </div>

      <div className="demo-section">
        <h3>🛡️ Error Boundaries</h3>
        <p>Gracefully handles JavaScript errors in component trees</p>
        <ul>
          <li>Prevents entire app crashes</li>
          <li>Provides fallback UI</li>
          <li>Better user experience</li>
        </ul>
      </div>

      <div className="demo-section">
        <h3>🌀 React Portals</h3>
        <p>Renders children outside parent DOM hierarchy</p>
        <ul>
          <li>Perfect for modals, tooltips, popovers</li>
          <li>Avoids z-index and overflow issues</li>
          <li>Cleaner DOM structure</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;