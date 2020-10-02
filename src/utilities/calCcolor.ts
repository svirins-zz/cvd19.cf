const calcTagColor = (rate: Number): String => {
  let color = 'gray-1';
  if (rate > 1) {
    color = 'red-3';
  } else if (rate < -1) {
    color = 'green-3';
  } else {
    color = 'blue-3';
  }
  return color;
};

export default calcTagColor;

// None = 'No Outbreak',
// Small = 'Small Outbreak',
// Losing = 'Losing',
// Flattening = 'Flattening the Curve',
// Crushing = 'Crushing the Curve',
// Winning = 'Winning',
// Won = 'Won',
