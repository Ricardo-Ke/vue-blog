function toNormalDate (d) {
  // return d.getFullYear() + '年' +
  //        (d.getMonth() + 1) + '月' +
  //        d.getDay() + '日 ' +
  //        d.getHours() + ':' +
  //        d.getMinutes()
  // d.replace(/T/g, ' ')
  //  .replace(/\.\d{3}Z/g, '')
  //  .replace(/-/g, '/')
  // let n = new Date(new Date(d) + 8 * 3600 * 1000)
  // return n
  let date = new Date(+new Date(d) + 8 * 3600 * 1000)
  return date.getFullYear() + '年' +
        (date.getMonth() + 1) + '月' +
        date.getDate() + '日 ' +
        date.getHours() + ':' +
        date.getMinutes()
}

export { toNormalDate }
