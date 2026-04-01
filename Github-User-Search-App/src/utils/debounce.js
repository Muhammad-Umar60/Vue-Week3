export default function debounce(fun, delay = 500) {
  let timer
  const debounced = function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fun(...args)
    }, delay)
  }
  return debounced
}
