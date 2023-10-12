// src/DatasetSelector.js

import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { generateDummyData } from "./DummyData";

const DatasetSelector = ({ onDatasetSelect }) => {
  const [selectedDataset, setSelectedDataset] = useState("moon");
    const [learningRate, setLearningRate] = useState(0.01);
    const [numLayers, setNumLayers] = useState(2);
    const [numWeightsPerLayer, setNumWeightsPerLayer] = useState(2);
  const [datasets, setDatasets] = useState({});

  useEffect(() => {
    const types = ["moon", "type2", "type3", "type4"];
    const newDatasets = {};
    types.forEach((type) => {
      newDatasets[type] = generateDummyData(type);
    });
    setDatasets(newDatasets);
  }, []);

  useEffect(() => {
    console.log(datasets);
  }, [datasets]);

  const handleSelect = (event) => {
    setSelectedDataset(event.target.value);
    onDatasetSelect(datasets[event.target.value]);
    console.log(datasets);
  };

  const handleTrain = () => {
    onDatasetSelect(
      datasets[selectedDataset],
      learningRate,
      numLayers,
      numWeightsPerLayer
    );
  };

  console.log(datasets)

  return (
    <div>
      <select value={selectedDataset} onChange={handleSelect}>
        <option value="moon">Moon</option>
        <option value="type2">Type 2</option>
        <option value="type3">Type 3</option>
        <option value="type4">Type 4</option>
      </select>
      <input
        type="number"
        value={learningRate}
        onChange={(e) => setLearningRate(e.target.value)}
      />
      <input
        type="number"
        value={numLayers}
        onChange={(e) => setNumLayers(e.target.value)}
      />
      <input
        type="number"
        value={numWeightsPerLayer}
        onChange={(e) => setNumWeightsPerLayer(e.target.value)}
      />
      <button onClick={handleTrain}>Train Model</button>
      <Plot
        data={[
          datasets[selectedDataset]
            ? {
                x: datasets[selectedDataset].map((d) => d.x[0]),
                y: datasets[selectedDataset].map((d) => d.x[1]),
                mode: "markers",
                type: "scatter",
                marker: { color: datasets[selectedDataset].map((d) => d.y) },
              }
            : {},
        ]}
        layout={{ width: 500, height: 500, title: "Scatter Plot" }}
      />
    </div>
  );
};

export default DatasetSelector;
