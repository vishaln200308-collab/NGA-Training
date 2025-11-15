import React from 'react';

function HeavyPage() {
  // Simulate a heavy component with lots of content
  return (
    <div className="heavy-content">
      <h2>Heavy Component Loaded!</h2>
      <p>This component was lazy-loaded and code-split from the main bundle.</p>
      
      <h3>Large Content Section</h3>
      {Array.from({ length: 50 }, (_, i) => (
        <p key={i}>
          This is paragraph {i + 1} of simulated heavy content. Lazy loading ensures this content 
          doesn't block the initial page render. The component chunk is fetched only when needed.
        </p>
      ))}
      
      <div style={{ 
        width: '100%', 
        height: '500px', 
        background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '24px',
        margin: '20px 0'
      }}>
        Simulated Large Image/Content Area
      </div>
      
      <p><strong>Check the Network tab in DevTools</strong> to see the separate chunk being loaded when you navigate to this page.</p>
    </div>
  );
}

export default HeavyPage;