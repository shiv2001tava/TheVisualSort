export async function* InsertionSort(
  array,
  swap,
  highlight,
  marksort,
  sortingOrder
) {
  for (let i = 0; i < array.length; i++) {
    let keyIndex = i
    for (var j = i - 1; j >= 0; j--) {
      yield await highlight([keyIndex, j])
      if (sortingOrder == 1) {
        if (array[j] > array[keyIndex]) {
          yield await swap(j, keyIndex)
          keyIndex = j
        } else {
          yield
          break
        }
      } else {
        if (array[j] < array[keyIndex]) {
          yield await swap(j, keyIndex)
          keyIndex = j
        } else {
          yield
          break
        }
      }
    }

    marksort(i)
    yield
  }
}
