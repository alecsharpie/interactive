// src/NeuralNetwork.js

import * as torch from "webgpu-torch";

export const trainModel = async (
  dataset,
  learningRate,
  numLayers,
  numWeightsPerLayer
) => {
  if (!(await torch.initWebGPUAsync())) {
    console.warn(`WebGPU is not supported.`);
    return;
  }

  // Initialize weights and biases for each layer
  const weights = Array.from({ length: numLayers }, () =>
    torch.tensor({
      data: Array.from({ length: numWeightsPerLayer }, () => Math.random()),
      requiresGrad: true,
    })
  );
  const biases = Array.from({ length: numLayers }, () =>
    torch.tensor({
      data: Array.from({ length: numWeightsPerLayer }, () => Math.random()),
      requiresGrad: true,
    })
  );

  // Define the forward pass
  const forward = (x) => {
    let a = x;
    for (let i = 0; i < numLayers; i++) {
      const z = a.mul(weights[i]).add(biases[i]);
      a = z.relu();
    }
    return a;
  };

  // Define the loss function (mean squared error)
  const loss = (pred, y) => {
    console.log(pred.sub(y)); // .pow(2) BUG HERE POW DOESNT WORK
    return pred.sub(y).mean();
  };

  // Training loop
  for (let i = 0; i < 100; i++) {
    // for 100 epochs
    console.log(`Epoch ${i + 1}`);
    console.log(dataset);
    for (let j = 0; j < dataset.length; j++) {
      // Get data point
      const dataX = torch.tensor({ data: dataset[j].x, requiresGrad: true });
      const dataY = torch.tensor({ data: dataset[j].y, requiresGrad: true });

      // Perform forward pass and compute loss
      const pred = forward(dataX);
      console.log(pred);
      const l = loss(pred, dataY);

      console.log(l);

      // Perform backpropagation
      l.backward();

      // Update weights and biases
      weights.forEach((w) => w.sub_(w.grad.mul(learningRate)));
      biases.forEach((b) => b.sub_(b.grad.mul(learningRate)));

      // Zero the gradients
      weights.forEach((w) => w.grad.zero_());
      biases.forEach((b) => b.grad.zero_());

      // Print loss
      console.log(`Epoch ${i + 1}, Data Point ${j + 1}: ${l.data}`);
    }
  }
};
