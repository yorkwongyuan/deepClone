function clone (target) {
  let obj = {}
  if (typeof target === 'object') {
    for (let key in target) {
      obj[key] = target[key]
    }
    return obj;
  } else {
    return target
  }
}
let obj = {
  name: 'york',
  age: 12
}

let _obj = clone(obj)
console.log(_obj === obj) // false