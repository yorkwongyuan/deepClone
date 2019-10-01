// 循环引用问题
function clone (target, map = new Map()) {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {}
    if (map.get(target)) {
      return map.get(target)
    }
    map.set(target, cloneTarget)
    for (let key in target) {
      cloneTarget[key] = clone(target[key], map)
    }
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