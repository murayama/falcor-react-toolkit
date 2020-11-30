import React from 'react';
import { Model } from 'falcor';

interface batchModels {
  [key: string]: Model
}
export interface Store {
  model?: Model;
  batchModels?:batchModels;
  addBatchModel: (key: string, model: Model) => void;
}

export interface Props {
  children: React.ReactNode;
  model: Model;
}

const batchModels: batchModels = {};
const addBatchModel = (key: string, batchModel: Model) => {
  batchModels[key] = batchModel;
}

export const FalcorContext: React.Context<Store> = React.createContext<Store>({
  model: undefined,
  batchModels: batchModels,
  addBatchModel
});

const FalcorProvider: React.FC<Props> = (props: Props): JSX.Element => {
  const {children, model} = props;
  if (!model) {
    throw new Error('model is required');
  }

  return (
    <FalcorContext.Provider value={{model, batchModels, addBatchModel}}>
      {children}
    </FalcorContext.Provider>
  );
}

export default FalcorProvider;
