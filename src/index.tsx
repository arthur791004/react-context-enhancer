import * as React from 'react';
import { ContextProviderProps, SelectorFn } from './types';
import Subscription from './Subscription';
import { refEqual } from './utils';

const Context = React.createContext(undefined);

export const ContextProvider = ({ value, children }: ContextProviderProps) => {
  const subscription = React.useMemo(() => new Subscription(), []);
  const valueRef = React.useRef(value);
  const targetValue = React.useMemo(() => ({
    valueRef,
    subscription,
  }), [valueRef, subscription]);

  valueRef.current = value;

  React.useLayoutEffect(() => {
    subscription.notify();
  }, [valueRef, subscription]);

  return <Context.Provider value={targetValue}>{children}</Context.Provider>;
};

export const useContextSelector = (selector: SelectorFn, areEqual = refEqual) => {
    const { valueRef, subscription } = React.useContext(Context);
    const [, forceRender] = React.useReducer((s) => s + 1, 0);
    const latestSelectorRef = React.useRef<SelectorFn>();
    const latestSelectedValueRef = React.useRef();
    const selectedValue =
        selector !== latestSelectorRef.current ? selector(valueRef.current) : latestSelectedValueRef.current;

    latestSelectorRef.current = selector;
    latestSelectedValueRef.current = selectedValue;

    React.useLayoutEffect(() => {
        const checkForUpdates = () => {
            try {
                const nextSelectedValue = latestSelectorRef.current(valueRef.current);
                if (areEqual(nextSelectedValue, latestSelectedValueRef.current)) {
                    return;
                }

                latestSelectedValueRef.current = nextSelectedValue;
            } catch (error) {
                // ignore error
            }

            forceRender();
        };

        subscription.subscribe(checkForUpdates);

        return () => {
            subscription.unsubscribe(checkForUpdates);
        };
    }, [valueRef, subscription]);

    return selectedValue;
};
