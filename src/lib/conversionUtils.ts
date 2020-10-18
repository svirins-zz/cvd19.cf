function commafy( value ) {
  let numberString = `${value}`;

  numberString = numberString.split( '' );

  numberString.reverse();

  numberString = numberString.reduce(( prev, current, index ) => {
    const shouldComma = ( index + 1 ) % 3 === 0 && index + 1 < numberString.length;
    let updatedValue = `${prev}${current}`;
    if ( shouldComma ) {
      updatedValue = `${updatedValue},`;
    }
    return updatedValue;
  }, '' );

  numberString = numberString.split( '' );
  numberString.reverse();
  numberString = numberString.join( '' );

  return numberString;
}

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