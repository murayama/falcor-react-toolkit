import React, {useCallback, useRef} from 'react';
import { Model } from 'falcor';

interface FBatchModels {
  [key: string]: Model
}

export interface Store {
  model?: Model;
  batchModels?: FBatchModels;
  addBatchModel?: (key: string, model: Model) => void;
}

export interface Props {
  children: React.ReactNode;
  model: Model;
}

export const FalcorContext: React.Context<Store> = React.createContext<Store>({
  model: undefined,
  batchModels: undefined,
  addBatchModel: undefined
});

const FalcorProvider: React.FC<Props> = (props: Props): JSX.Element => {
  const {children, model} = props;
  const batchModels = useRef<FBatchModels>({});

  const addBatchModel = useCallback((key: string, batchModel: Model) => {
    batchModels.current[key] = batchModel;
  }, []);

  if (!model) {
    throw new Error('model is required');
  }

  return (
    <FalcorContext.Provider value={{model, batchModels: batchModels.current, addBatchModel}}>
      {children}
    </FalcorContext.Provider>
  );
}

export default FalcorProvider;
