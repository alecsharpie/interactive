import React, { useEffect, useRef } from "react";
import glslangModule from "@webgpu/glslang";

const WebGPUGrid = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const run = async () => {
      if (!navigator.gpu) {
        console.warn("WebGPU is not supported");
        return;
      }

      const adapter = await navigator.gpu.requestAdapter();
      const device = await adapter.requestDevice();
      const glslang = await glslangModule();

      // TODO: Setup WebGPU pipeline and render grid
    };

    run();
  }, [data]);

  return <canvas ref={canvasRef} />;
};

export default WebGPUGrid;
