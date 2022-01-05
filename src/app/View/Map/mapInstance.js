let map = null;

let currentLayer = null;

export const getMap = (instance = null) => {
  if(instance != null){
    map = instance
    return map
  }

  if(map != null){
    return map
  }

  return null
}

export const getCurrentLayer = (instance = null) => {
  if(instance != null){
    currentLayer = instance
    return currentLayer
  }

  if(currentLayer != null){
    return currentLayer
  }

  return null
}
