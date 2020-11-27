# falcor-react-toolkit

[![npm version](https://badge.fury.io/js/falcor-react-toolkit.svg)](https://badge.fury.io/js/falcor-react-toolkit)

falcor for react hooks

## usage

FalcorProvider

```javascript
import {FalcorProvider} from 'falcor-react-toolkit';

const model = new Falcor.Model({...});

return (
  <FalcorProvider model={model}>
    <App />
  </FalcorProvider>
)
```

useFalcor hooks

```javascript
import {useFalcor} from 'falcor-react-toolkit';

const App = (props) => {
  const path = ['foo', 'bar'];
  const {loading, error, result} = useFalcor(path);

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

use normalizer

```javascript
import {useFalcor} from 'falcor-react-toolkit';

const App = (props) => {
  const path = ['foo', 'bar'];
  const normalizer = (json) => {
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
