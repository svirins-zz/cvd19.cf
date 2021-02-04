const expect = require('./data.js')
function replacerFN (result) {
  
  const data = result.data.countries.map(country => {
    let {n ,r} = country;
    let replacedResults = r.map(date => {
      let {dt,d,c,r} = date
      return {
        date: dt,
        deaths: d,
        confirmed: c,
        recovered: r
      }
    })
    return {
      name:n,
      results: replacedResults
    }
  })
  return data
}

replacerFN(expect)