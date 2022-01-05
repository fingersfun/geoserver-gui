let editor = null;

let getInstance = (instance = null) => {
  if(editor != null){
    return editor
  }

  if(instance != null){
    editor = instance
    return editor
  }

  return null
}

export let setInstance = (instance) => {
  editor = instance
}

export default getInstance;