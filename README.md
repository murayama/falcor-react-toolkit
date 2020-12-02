# falcor-react-toolkit

[![npm version](https://badge.fury.io/js/falcor-react-toolkit.svg)](https://badge.fury.io/js/falcor-react-toolkit)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

[falcor](https://www.npmjs.com/package/falcor) for react hooks

- react >= 16.8.0

## usage

FalcorProvider

```javascript
import React from 'react';
import Falcor from 'falcor';
import { FalcorProvider } from 'falcor-react-toolkit';

const model = new Falcor.Model({
  cache: {
    foo: 'bar',
    todos: [
      { name: 'get milk from corner store' },
      { name: 'withdraw money from ATM' },
    ]
  }
});

return (
  <FalcorProvider model={model}>
    <App />
  </FalcorProvider>
)
```

### useFalcor hooks

```javascript
import React from 'react';
import { useFalcor } from 'falcor-react-toolkit';

const App = (props) => {
  const path = ['foo'];
  const { loading, error, data } = useFalcor(path);

  return (
    <div>
      {loading && <span>Now Loading...</span>}
      {!loading && (
        <div>
          {data.foo}
        </div>
      )}
    </div>
  )
};
```

### useFalcor with normalizer

```javascript
import React from 'react';
import { useFalcor } from 'falcor-react-toolkit';

const App = (props) => {
  const path = ['todos', { from: 0, to: 10 }, ['name']];
  const normalizer = (json) => {
    return Object.entries(json.todos)
    .filter(([key, _]) => key !== '$__path')
    .map(([_, val]) => val);
  };
  const { loading, error, data } = useFalcor(path, { normalizer });

  return (
      <div>
      {loading && <span>Now Loading...</span>}
      {!loading && (
        <div>
          {data.map(value => <div>{value.name}</div>)}
        </div>
       )}
      </div>
      )
};
```

### useFalcor with batchModel

```javascript
import React from 'react';
import { useFalcor } from 'falcor-react-toolkit';

const App = (props) => {
  const path = ['foo'];
  const batch = {key: 'default-batch-model', delay: 100};
  const { loading, error, data } = useFalcor(path, { batch });

  return (
      <div>
      {loading && <span>Now Loading...</span>}
      {!loading && (
          <div>
          {data.foo}
          </div>
          )}
      </div>
      )
};
```

### useFalcorModel

```javascript
import React from 'react';
import { useFalcorModel } from 'falcor-react-toolkit';

const App = (props) => {
  const model = useFalcorModel();
  ...
}
```
