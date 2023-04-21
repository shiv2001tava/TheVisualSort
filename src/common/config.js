import { getScreenWidth } from './helper'
import { BubbleSort } from '../sortFunctions/BubbleSort'
import { SelectionSort } from '../sortFunctions/SelectionSort'
import { InsertionSort } from '../sortFunctions/InsertionSort'
import { QuickSort } from '../sortFunctions/QuickSort'
import { HeapSort } from '../sortFunctions/HeapSort.js'
import { MergeSort } from '../sortFunctions/MergeSort'

// colors setting
export const comparisionColor = '#a7c5e1'
export const swapColor = '#3e7ebb'
export const sortedColor = '#72cbce'
export const pivotColor = '#ad87dd'

// time setting
export let swapTime = 1000
export let compareTime = 500

// init array
export let sortingArray = initArrayForScreenSize()

export const sortingAlgorithms = [
  {
    component: BubbleSort,
    title: 'Bubble',
    name: 'BubbleSort',
    def: 'adasdasdasdasda1',
  },
  {
    component: SelectionSort,
    title: 'Selection',
    name: 'SelectionSort',
    def: 'adasdasdasdasda222',
  },
  {
    component: InsertionSort,
    title: 'Insertion',
    name: 'InsertionSort',
    def: 'adasdasdasdasda3',
  },
  {
    component: HeapSort,
    title: 'Heap',
    name: 'HeapSort',
    def: 'adasdasdasdasda4',
  },
  {
    component: MergeSort,
    title: 'Merge',
    name: 'MergeSort',
    def: 'adasdasdasdasda5',
  },
  {
    component: QuickSort,
    title: 'Quick',
    name: 'QuickSort',
    def: 'adasdasdasdasda6',
  },
]

function initArrayForScreenSize() {
  const screenSize = getScreenWidth()
  if (screenSize < 460) return [4, 3, 2, 1]
  else if (screenSize < 720) return [8, 7, 6, 5, 4, 3, 2, 1]
  return [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
}
