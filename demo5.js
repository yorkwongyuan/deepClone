// 考虑其他类型

function forEach (arr, callback) {
  let index = -1;
  while (++index < arr.length) {
    callback(arr[index], index)
  }
  return arr
}

function isObject (target) {
  return target !== null && (typeof target === 'object' || typeof target === 'function')
}

function clone (target, map = new WeakMap()) {
  if (isObject) {
    let cloneTarget = Array.isArray(target) ? [] : {}
    if (map.get(target)) {
      return map.get(target)
    }
    map.set(target, cloneTarget)
    let keys = Array.isArray(target) ? undefined : Object.keys(target)
    forEach(keys || target, (item, index) => {
      if (keys) {
        index = item
      }
      cloneTarget[index] = clone(target[index], map)
    })
    return cloneTarget
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