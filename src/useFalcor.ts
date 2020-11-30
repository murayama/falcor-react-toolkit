import React, { useReducer, useEffect } from 'react';
import { PathSet } from 'falcor';
import useFalcorModel, { Batch } from './useFalcorModel';

interface State {
  loading: boolean;
  error?: any;
  result?: any;
}

interface Action {
  type: string;
  error?: {};
  value?: {};
}

export interface FNormalizer {
  (json: any): any;
}

export interface FOptions {
  batch?: Batch;
  normalizer?: FNormalizer;
}

const ActionType = {
  START: 'START',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
} as const;

const reducer: React.Reducer<State, Action> = (state: State, action: Action) => {
  switch(action.type) {
    case ActionType.START:
      return {loading: true, error: undefined, result: undefined};
    case ActionType.SUCCESS:
      return {loading: false, error: undefined, result: action.value};
    case ActionType.ERROR:
      return {loading: false, error: action.error, result: undefined};
    default:
      return state;
  }
}

const initialState : State = {loading: false, error: undefined, result: undefined};

export default (query: string | PathSet, options: FOptions = {}): State => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { batch, normalizer } = options;
  const model = useFalcorModel(batch);

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
                return jsonEnvelope.json;
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
