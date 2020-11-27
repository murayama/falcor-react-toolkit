import React from 'react';
import './App.css';
import { useFalcor, FNormalizer } from 'falcor-react-toolkit';

interface Todo {
  name: string;
  done: boolean;
}

const normarizer : FNormalizer = (json) => {
  const todos = Object.entries(json.todos).filter(([key, _]) => key !== '$__path').map(([_, val]) => val);
  return todos;
}

function App() {
  const path = ['todos', {from: 0, to: 1}, ['name', 'done']];
  const {loading, error, result} = useFalcor(path, normarizer);
  return (
    <div className="App">
      {loading && <div>Loading...</div>}
      {!loading && (
        <div>
          <div>TODO</div>
        {result && result.map((val: Todo, i: number) => (
          <div key={`todo-${i}`}>
            <input type="checkbox" name="" id="" checked={val.done}/>{val.name}
          </div>
        ))}
        {error && <div>{error}</div>}
        </div>
      )}
    </div>
  );
}

export default App;
