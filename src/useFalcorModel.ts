import { useContext } from 'react';
import { Model } from 'falcor';
import { FalcorContext } from './FalcorProvider';

export default (): Model => {
  const { model } = useContext(FalcorContext);
  return model;
}
