export default function closureCount(){
  let count = 0
  function updateCount(){
    count ++
    return count
  }
  return updateCount
}
