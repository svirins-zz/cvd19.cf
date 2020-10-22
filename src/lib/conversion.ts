const commafy = (value: number): string => {
  const toStrValue = `${value}`;
  return toStrValue
    .split('')
    .reverse()
    .reduce((prev, current, index) => {
      const shouldComma = (index + 1) % 3 === 0 && index + 1 < toStrValue.length;
      let updatedValue = `${prev}${current}`;
      if (shouldComma) {
        updatedValue = `${updatedValue},`;
      }
      return updatedValue;
    }, '')
    .split('')
    .reverse()
    .join('');
};
export default commafy;

// TODO: consider adding commafy to values or adjusting circle radius
// stats = stats.map((stat) => {
//   const value = stat?.value;

//   if (!value) return stat;

//   let newValue = value;

//   if (stat?.type === 'number') {
//     newValue = commafy(value);
//     if (value > 999999) {
//       newValue = `${newValue.slice(0, -8)}m+`;
//     } else if (value > 999) {
//       newValue = `${newValue.slice(0, -4)}k+`;
//     }
//   }
//   return {
//     ...stat,
//     value: newValue,
//   };
// });
