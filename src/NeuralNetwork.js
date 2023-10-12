// src/NeuralNetwork.js
import { matmul } from "webgpu-torch/src/ops_artisanal";
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

  // Convert dataset to tensors
  const x = torch.tensor({ data: dataset.map((d) => d.x), requiresGrad: true });
  const y = torch.tensor({ data: dataset.map((d) => d.y), requiresGrad: true });

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
      const z = matmul(a, weights[i]).add(biases[i]);
      a = z.relu();
    }
    return a;
  };

  // Define the loss function (mean squared error)
  const loss = (pred, y) => {
    return pred.sub(y).pow(2).mean();
  };

  // Training loop
  for (let i = 0; i < 100; i++) {
    // for 100 epochs
    // Perform forward pass and compute loss
    const pred = forward(x);
    const l = loss(pred, y);

    // Perform backpropagation
    l.backward();

    // Update weights and biases
    weights.forEach((w) => w.sub_(w.grad.mul(learningRate)));
    biases.forEach((b) => b.sub_(b.grad.mul(learningRate)));

    // Zero the gradients
    weights.forEach((w) => w.grad.zero_());
    biases.forEach((b) => b.grad.zero_());

    // Print loss
    console.log(`Epoch ${i + 1}: ${l.data}`);
  }
};
