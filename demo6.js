// 增加了set还有map类型
function getInit (target) {
  let Ctor = target.constructor
  return new Ctor;
}

function getType (target) {
  let type = Object.prototype.toString.call(target)
  let reg = /(?<=\s)(.*)(?=\])/
  return reg.exec(type)[1]
}

function forEach (arr, callback) {
  let index = -1;
  while (++index < arr.length) {
    callback(arr[index], index)
  }
}

// 是否为对象
function isObject (target) {
  return target !== null && (typeof target === 'object' || typeof target === 'function')
}

function clone (target, map = new WeakMap()) {
  let deepTag = ['Array', 'Object', 'Set', 'Map']

  // 如果不是对象,则直接返回
  if (!isObject(target)) {
    return target;
  }

  // 克隆对象
  let cloneTarget;

  // 如果存在需要深拷贝的对象
  if (deepTag.includes(getType(target))) {
    cloneTarget = getInit(target)
  }
  // let cloneTarget = Array.isArray(target) ? [] : {}
  if (map.get(target)) {
    return map.get(target)
  }
  map.set(target, cloneTarget)

  if (getType(target) === 'Set') {
    target.forEach(value => {
      target.add(clone(value, map))
    })
  }

  if (getType(target) === 'Map') {
    target.forEach((value, index) => {
      target.set(index, clone(value, map))
    })
  }



  let keys = Array.isArray(target) ? undefined : Object.keys(target);
  forEach(keys || target, function (item, index) {
    if (keys) {
      index = item
    }
    cloneTarget[index] = target[index]
  })
  return cloneTarget

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
  set: new Set()
}

obj.obj = obj // Maximum call stack size exceeded

let _obj = clone(obj)

console.log(_obj === obj) //false
console.log(_obj)