import React from 'react';
import { Model } from 'falcor';

export interface Store {
  model?: Model
}

export interface Props {
  children: React.ReactNode;
  model: Model;
}

export const FalcorContext: React.Context<Store> = React.createContext<Store>({model: undefined});

const FalcorProvider: React.FC<Props> = (props: Props): JSX.Element => {
  const {children, model} = props;
  return (
    <FalcorContext.Provider value={{model}}>
      {children}
    </FalcorContext.Provider>
  );
}

export default FalcorProvider;
