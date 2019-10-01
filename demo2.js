function clone (target) {
  if (typeof target === 'object') {
    let obj = Array.isArray(target) ? [] : {}
    for (let key in target) {
      obj[key] = clone(target[key])
    }
    return obj
  } else {
    return target
  }
}

let obj = {
  name: 'york',
  o: {
    id: 123,
    str: 'nigel',
    hehe: {
      test: true,
      arr: [1, 2, 3]
    }
  }
}

obj.obj = obj // Maximum call stack size exceeded

let _obj = clone(obj)

console.log(_obj === obj) //false
console.log(_obj)