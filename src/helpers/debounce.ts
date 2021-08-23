function debounce<T>(fn: (param: T) => void, delay = 500) {
  let timer: NodeJS.Timeout;
  return (param: T) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(param)
    }, delay)
  }
}

export {
  debounce
}
export default debounce