// src/DummyData.js

export const generateDummyData = (type, numCategories = 2) => {
  console.log(type);
  console.log('dummy data');
  const data = [];
  for (let i = 0; i < 100; i++) {
    const x1 = Math.random() * 2 - 1; // x1 and x2 are now in the range [-1, 1]
    const x2 = Math.random() * 2 - 1;
    let y;
    switch (type) {
      case "moon":
        // Points inside a circle of radius 0.5 centered at (0.5, 0.5) are classified as 1
        y =
          Math.sqrt(Math.pow(x1 - 0.5, 2) + Math.pow(x2 - 0.5, 2)) < 0.5
            ? 1
            : 0;
        break;
      case "type2":
        // Points above the line y = x are classified as 1
        y = x2 > x1 ? 1 : 0;
        break;
      case "type3":
        // Points inside a circle of radius 0.5 centered at the origin are classified as 1
        y = Math.sqrt(x1 * x1 + x2 * x2) < 0.5 ? 1 : 0;
        break;
      case "type4":
        // Points in the upper right or lower left quadrants are classified as 1
        y = (x1 > 0 && x2 > 0) || (x1 < 0 && x2 < 0) ? 1 : 0;
        break;
      default:
        y = x1 + x2 > 1 ? 1 : 0;
    }
    y = y % numCategories; // ensure y is within the number of categories
    data.push({ x: [x1, x2], y: [y] });
  }
  console.log(data);
  return data;
};
