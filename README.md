# react-context-enhancer

Provide a better performance for react context


## Installation

```sh
yarn add @arthur791004/react-context-enhancer
```

## Usages

TBD

#### Examples

```js
import * as React from 'react';
import { createContext } from '@arthur791004/react-context-enhancer';

const { ContextProvider, useContextSelector } = createContext();

const IncreaseButton = () => {
  const setCount = useContextSelector(contextValue => contextValue.setCount);
  const increase = React.useCallback(() => setCount(count => count + 1), [setCount]);

  return <button onClick={increase}>Increase</button>;
}

const Count = () => {
  const count = useContextSelector(contextValue => contextValue.count);

  return <div>{count}</div>;
}

const App = () => {
  const [count, setCount] = useState(0);
  const value = {
    count,
    setCount,
  };

  return (
    <ContextProvider value={value}>
      <Counter />
      <IncreaseButton />
    </ContextProvider>
  )
}
```
