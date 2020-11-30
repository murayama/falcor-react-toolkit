import { useContext } from 'react';
import { Model } from 'falcor';
import { FalcorContext } from './FalcorProvider';

export interface Batch {
  key: string;
  delay?: number;
}

export default (batch?: Batch): Model => {
  const { model, batchModels, addBatchModel } = useContext(FalcorContext);
  if (batch) {
    if (batchModels && batchModels[batch.key]) {
      return batchModels[batch.key];
    } else {
      const batchModel = model.batch(batch.delay || 100);
      addBatchModel(batch.key, batchModel);
      return batchModel;
    }
  } else {
    return model;
  }
}
