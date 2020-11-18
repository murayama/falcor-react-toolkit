import React, { useReducer, useEffect, useContext } from 'react';
import { PathSet } from 'falcor';
import { FalcorContext } from './FalcorProvider';

interface State {
  loading: boolean;
  error?: {};
  result?: {};
}

interface Action {
  type: string;
  error?: {};
  value?: {};
}

interface Normalizer {
  (json: object): any;
}

const ActionType = {
  START: 'START',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
} as const;

const reducer: React.Reducer<State, Action> = (state: State, action: Action) => {
  switch(action.type) {
    case 'start':
      return {loading: true, error: undefined, result: undefined};
    case 'success':
      return {loading: false, error: undefined, result: action.value};
    case 'error':
      return {loading: false, error: action.error, result: undefined};
    default:
      return state;
  }
}

const initialState = {loading: false, error: undefined, result: undefined};

export default (query: string | PathSet, normalizer?: Normalizer) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { model } = useContext(FalcorContext);
  useEffect(() => {
    let unmounted: boolean = false;
    const fetch = async () => {
      if (model && !unmounted) {
        dispatch({type: ActionType.START})
        try {
          const jsonEnvelope = await model.get(query);
          if (!unmounted) {
            const value = (() => {
              if (normalizer) {
                return normalizer(jsonEnvelope.json);
              } else {
                jsonEnvelope.json;
              }
            })();
            dispatch({type: ActionType.SUCCESS, value});
          }
        } catch (error) {
          if (!unmounted) {
            dispatch({type: ActionType.ERROR, error});
          }
        }
      }
    }
    fetch();
    return () => {
      unmounted = true;
    }
  }, [query.toString()]);

  return {...state};
}
