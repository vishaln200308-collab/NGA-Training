// Here we will call the hooks demo component
import React from 'react';  
// import HooksDemo from './components/HooksDemo';
import useFetch from './components/usefetch';


function App() {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts');
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <h1>Posts</h1>
      {data && data.map(post => (
        <div key={post.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

  
export default App;