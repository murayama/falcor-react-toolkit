# falcor-react-toolkit

[![npm version](https://badge.fury.io/js/falcor-react-toolkit.svg)](https://badge.fury.io/js/falcor-react-toolkit)

[falcor](https://www.npmjs.com/package/falcor) for react hooks

## usage

FalcorProvider

```javascript
import React from 'react';
import Falcor from 'falcor';
import {FalcorProvider} from 'falcor-react-toolkit';

const model = new Falcor.Model({
  cache: {
    foo: 'bar',
    todos: [
      {name: 'aaaa'},
      {name: 'bbbb'},
      {name: 'cccc'},
    ]
  }
});

return (
  <FalcorProvider model={model}>
    <App />
  </FalcorProvider>
)
```

useFalcor hooks

```javascript
import React from 'react';
import {useFalcor} from 'falcor-react-toolkit';

const App = (props) => {
  const path = ['foo'];
  const {loading, error, result} = useFalcor(path);

  return (
    <div>
      {loading && <span>Now Loading...</span>}
      {!loading && (
        <div>
          {result.foo}
        </div>
      )}
    </div>
  )
};
```

use normalizer

```javascript
import React from 'react';
import {useFalcor} from 'falcor-react-toolkit';

const App = (props) => {
  const path = ['todos', {from: 0, to: 10}, ['name']];
  const normalizer = (json) => {
    return Object.entries(json.todos)
    .filter(([key, _]) => key !== '$__path')
    .map(([_, val]) => val);
  };
  const {loading, error, result} = useFalcor(path, normalizer);

  return (
      <div>
      {loading && <span>Now Loading...</span>}
      {!loading && (
        <div>
          {result.map(value => <div>{value}</div>)}
        </div>
       )}
      </div>
      )
};
```
