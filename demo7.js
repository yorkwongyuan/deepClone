// 初始化
function getInit (target) {
  let Ctor = target.constructor
  return new Ctor()
}

function getType (target) {
  let str = Object.prototype.toString.call(target)
  let reg = /(?<=\s)(.*)(?=\])/g
  let result = reg.exec(str)[0]
  return result
}
function isObject (target) {
  return typeof target !== null && (typeof target === 'function' || typeof target === 'object')
}

function forEach (arr, callback) {
  let index = -1;
  while (++index < arr.length) {
    callback(arr[index], index)
  }
}

function clone (target, map = new WeakMap()) {
  if (!isObject(target)) {
    return target
  }

  let deepTags = ['Array', 'Object', 'Set', 'Map']
  let cloneTarget;
  // 可以深入递归的
  if (deepTags.includes(getType(target))) {
    cloneTarget = getInit(target)
  }

  if (map.get(target)) {
    return map.get(target)
  }
  map.set(target, cloneTarget)


  if (getType(target) === 'Set') {
    target.forEach(item => {
      target.add(item, clone(item, map))
    })
    return target
  }

  if (getType(target) === 'Map') {
    target.forEach((item, index) => {
      target.set(index, clone(item, map))
    })
    return target
  }

  if (getType(target) === 'function') {
    return cloneFunction(target)
  }

  let keys = Array.isArray(target) ? undefined : Object.keys(target);
  forEach(keys || target, function (item, index) {
    if (keys) {
      index = item
    }
    cloneTarget[index] = clone(target[index], map)
  })
  return cloneTarget

}

// 克隆正则表达式
function cloneReg (target) {
  let _reg = /\w*$/;
  console.log(target.source, _reg.exec(target))
  const result = new target.constructor(target.source, _reg.exec(target))
  result.lastIndex = target.lastIndex
  return result
}

// 克隆函数
function cloneFunction (func) {
  let paramReg = /(?<=\().+(?=\)\s+{)/;
  let bodyReg = /(?<={)(.|\n)+(?=})/m
  let funcStr = func.toString()
  if (func.prototype) {
    let body = bodyReg.exec(funcStr)[0]
    if (body) {
      let params = paramReg.exec(funcStr)[0]
      if (params) {
        console.log('匹配到的参数', params)
        let args = params.split(',')
        return new Function(...args, body)
      } else {
        return new Function(body)
      }
    } else {
      return null
    }
  } else {
    return eval(funcStr)
  }
}

function test (p1, p2) {
  let a = 123;
  let b = 321;
  a + b
  return p1 + p2
}


let map = new Map()
map.set('name', { id: 23, age: 99 })
let obj = {
  name: 'york',
  son: {
    id: 123,
    str: 'nigel',
    arr: {
      test: true,
      arr: [1, 2, 3]
    }
  },
  map: map,
  set: new Set(['york', 'nigel']),
  func: test
}

obj.obj = obj // Maximum call stack size exceeded

let _obj = clone(obj)
obj.son.str = "robin"
console.log(_obj === obj) //false
console.log(_obj.son.str)
