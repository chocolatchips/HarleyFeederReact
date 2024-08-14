import './App.css';
import { useEffect, useState } from 'react';


function App() {
  const [data, setData] = useState(null);
  const [test, setTest] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const date = new Date(Date.now()).toLocaleTimeString().slice(16,18);
  
  useEffect(() => {
    setLoading(true);
    fetch(`https://www.sheard.ca/harley/${date > 12 ? 'evening': 'morning'}`, {method: "GET"   })
    .then((response) => response.json())
    .then(setData)
    .catch(setError);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch('https://www.sheard.ca/harley')
    .then((response) => response.json())
    .then(setTest)
    .then(() => setLoading(false))
    .catch(setError);
  }, []);

  if(loading)
      return (<h1>Loading...</h1>);
  if (error)
    return (<pre>{JSON.stringify(error)}</pre>);
  if(!data) return null;

  return (
    <div className="App">
      <header className="App-header">
        
        <h1>{data.isFed ? "Fed" : "Not Fed"}</h1>
        <h2>{data.type}</h2>
        <h2>{data.date}</h2>
        <h2>{test.date}</h2>
        <h2>{test.result}</h2>
        <h2>{test.isFed ? 'true' : 'false'}</h2>
      </header>
    </div>
  );
}

export default App;
