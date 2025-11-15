import React, { memo } from 'react';

const PureDisplay = memo(({ title, count }) => {
  // This log will only appear when props actually change
  console.log('PureDisplay rendered with:', { title, count });
  
  return (
    <div style={{ 
      padding: '20px', 
      border: '2px solid #4ecdc4', 
      borderRadius: '8px',
      backgroundColor: '#f8f9fa',
      marginTop: '15px'
    }}>
      <h4>PureDisplay Component</h4>
      <p><strong>Title:</strong> {title}</p>
      <p><strong>Count:</strong> {count}</p>
      <p><em>This component only re-renders when props change (check console)</em></p>
    </div>
  );
});

// Alternative implementation using React.PureComponent (class component):
/*
class PureDisplay extends React.PureComponent {
  render() {
    console.log('PureDisplay rendered with:', this.props);
    
    return (
      <div style={{ 
        padding: '20px', 
        border: '2px solid #4ecdc4', 
        borderRadius: '8px',
        backgroundColor: '#f8f9fa',
        marginTop: '15px'
      }}>
        <h4>PureDisplay Component (PureComponent)</h4>
        <p><strong>Title:</strong> {this.props.title}</p>
        <p><strong>Count:</strong> {this.props.count}</p>
        <p><em>This component only re-renders when props change (check console)</em></p>
      </div>
    );
  }
}
*/

export default PureDisplay;