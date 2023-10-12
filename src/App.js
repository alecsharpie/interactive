// src/App.js

import React from "react";
import DatasetSelector from "./DatasetSelector";
import { trainModel } from "./NeuralNetwork";

const App = () => {
  const handleDatasetSelect = (
    dataset,
    learningRate,
    numLayers,
    numWeightsPerLayer
  ) => {
    trainModel(dataset, learningRate, numLayers, numWeightsPerLayer);
  };

  return (
    <div>
      <h1>Select a Dataset</h1>
      <DatasetSelector onDatasetSelect={handleDatasetSelect} />
    </div>
  );
};

export default App;
