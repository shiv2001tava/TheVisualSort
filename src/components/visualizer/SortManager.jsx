import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { ArrayContainer } from './ArrayContainer'
import { MergeContainer } from './MergeContainer'
import { InfoFooter } from './InfoFooter'
import { Timer } from './Timer'
import Card from '@material-ui/core/Card'
import { delay } from '../../common/helper'
import shallow from 'zustand/shallow'
import { useControls, useData } from '../../common/store'

let compareTime = useControls.getState().compareTime
let swapTime = useControls.getState().swapTime

useControls.subscribe(
  ([cTime, sTime]) => {
    compareTime = cTime
    swapTime = sTime
  },
  (state) => [state.compareTime, state.swapTime],
  shallow
)

const Container = styled(Card)`
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.15);
`

const AlgoHeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 20px;
`

const TimerDiv = styled.div`
  display: flex;
  column-gap: 5px;
  min-width: 8rem;
  justify-content: flex-end;
`

export const SortManager = React.memo(function ({
  array,
  sortFunction,
  sortingAlgorithmName,
  key,
  def,
}) {
  const [order, OrderFlip] = useState(1) // start from ascending
  const [swapIndices, setSwapIndices] = useState([-1, -1])
  const [hightlightedIndices, setHightlightedIndices] = useState([-1, -1])

  const algoArray = useRef([])
  const sortedIndices = useRef([])
  const pivot = useRef(-1)
  const swapCount = useRef(0)
  const comparisionCount = useRef(0)
  const isAlgoExecutionOver = useRef(false)
  const isComponentUnMounted = useRef(false)

  const markSortngDone = useControls((state) => state.markSortngDone)
  const progress = useRef('')
  const sortProgressIterator = useRef(null)

  async function reset() {
    algoArray.current = [...useData.getState().sortingArray]
    sortedIndices.current = []
    pivot.current = -1
    swapCount.current = 0
    comparisionCount.current = 0
    isAlgoExecutionOver.current = false
    setSwapIndices([-1, -1])
    setHightlightedIndices([-1, -1])

    sortProgressIterator.current =
      sortingAlgorithmName === 'MergeSort'
        ? await sortFunction(algoArray.current, combine, highlight, markSort)
        : await sortFunction(
            algoArray.current,
            swap,
            highlight,
            markSort,
            order
          )
  }

  useEffect(() => {
    progress.current = useControls.getState().progress
    useControls.subscribe(
      (value) => {
        progress.current = value

        if (progress.current === 'start') runAlgo()
        if (progress.current === 'reset') reset()
      },
      (state) => state.progress
    )

    return () => {
      isComponentUnMounted.current = true
    }
  }, [])

  useEffect(() => {
    reset()
  }, [array])

  useEffect(() => {
    reset()
  }, [order])
  async function runAlgo() {
    let completion = { done: false }
    while (
      !completion?.done &&
      progress.current === 'start' &&
      !isComponentUnMounted.current
    ) {
      completion = await sortProgressIterator.current?.next()
    }

    if (isComponentUnMounted.current) {
      return
    }

    if (!isAlgoExecutionOver.current && completion?.done) {
      isAlgoExecutionOver.current = true
      pivot.current = -1
      setSwapIndices([-1, -1])
      setHightlightedIndices([-1, -1])
      markSortngDone()
    }
  }

  async function swap(i, j) {
    let tmp = algoArray.current[i]
    algoArray.current[i] = algoArray.current[j]
    algoArray.current[j] = tmp
    setSwapIndices([i, j])

    pivot.current = -1
    swapCount.current += 1
    await delay(swapTime)
  }

  async function combine(source, destination) {
    if (source !== destination) {
      swapCount.current += 1
      setHightlightedIndices([-1, -1])
      setSwapIndices([source, destination])
      await delay(swapTime)
    }
  }

  async function highlight(indices, p) {
    setSwapIndices([-1, -1])
    comparisionCount.current += 1
    pivot.current = p
    setHightlightedIndices(indices)
    await delay(compareTime)
  }

  function markSort(...indices) {
    sortedIndices.current.push(...indices)
  }

  const mergeContainer = (
    <MergeContainer
      array={algoArray.current}
      source={swapIndices[0]}
      destination={swapIndices[1]}
      hightlightedIndices={hightlightedIndices}
      sortedIndices={sortedIndices.current}
    />
  )
  const arrayContainer = (
    <ArrayContainer
      array={algoArray.current}
      source={swapIndices[0]}
      destination={swapIndices[1]}
      pivot={pivot.current}
      highlightIndices={hightlightedIndices}
      sortedIndices={sortedIndices.current}
    />
  )

  const flipOrder = () => {
    console.log('Mr lova lova 1: ' + JSON.stringify(order))
    order == 2 ? OrderFlip(1) : OrderFlip(2)
    console.log('Mr lova lova 2: ' + JSON.stringify(order))
  }

  return (
    <Container>
      <AlgoHeaderBar>
        <strong>{sortingAlgorithmName}</strong>
        <TimerDiv>
          <span>Time:</span>
          <strong>
            <Timer isAlgoExecutionOver={isAlgoExecutionOver.current} />
          </strong>
        </TimerDiv>
      </AlgoHeaderBar>
      {sortingAlgorithmName === 'MergeSort' ? mergeContainer : arrayContainer}
      <button
        onClick={() => {
          flipOrder()
        }}
      >
        {' '}
        Change Order{' '}
      </button>
      <InfoFooter
        swapCount={swapCount.current}
        comparisionCount={comparisionCount.current}
      ></InfoFooter>
      <div class='space'> </div>
      <div>
        Worst Case Time Complexity{' '}
        <b>
          {sortingAlgorithmName === 'BubbleSort'
            ? 'O(n^2)'
            : sortingAlgorithmName === 'SelectionSort'
            ? 'O(n^2)'
            : sortingAlgorithmName === 'InsertionSort'
            ? 'O(n^2)'
            : sortingAlgorithmName === 'HeapSort'
            ? 'O(nlog(n))'
            : sortingAlgorithmName === 'MergeSort'
            ? 'O(nlog(n))'
            : sortingAlgorithmName === 'QuickSort'
            ? 'O(n^2)'
            : ''}
        </b>
      </div>
      <div>
        Best Case Time Complexity{' '}
        <b>
          {sortingAlgorithmName === 'BubbleSort'
            ? 'Omega of (n^2)'
            : sortingAlgorithmName === 'SelectionSort'
            ? 'Omega of (n^2)'
            : sortingAlgorithmName === 'InsertionSort'
            ? 'Omega of (n)'
            : sortingAlgorithmName === 'HeapSort'
            ? 'Omega of (nlog(n))'
            : sortingAlgorithmName === 'MergeSort'
            ? 'Omega of (nlog(n))'
            : sortingAlgorithmName === 'QuickSort'
            ? 'Omega of (nlogn)'
            : ''}
        </b>
      </div>
      <div class='space'> </div>
      <div class='definition'>
        <b>
          {sortingAlgorithmName === 'BubbleSort'
            ? 'Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in the wrong order. This algorithm is not suitable for large data sets as its average and worst-case time complexity is quite high.'
            : sortingAlgorithmName === 'SelectionSort'
            ? 'The selection sort algorithm sorts an array by repeatedly finding the minimum element (considering ascending order) from the unsorted part and putting it at the beginning. '
            : sortingAlgorithmName === 'InsertionSort'
            ? 'Insertion sort is a simple sorting algorithm that works similar to the way you sort playing cards in your hands. The array is virtually split into a sorted and an unsorted part. Values from the unsorted part are picked and placed at the correct position in the sorted part.'
            : sortingAlgorithmName === 'HeapSort'
            ? 'Heap sort is a comparison-based sorting technique based on Binary Heap data structure. It is similar to the selection sort where we first find the minimum element and place the minimum element at the beginning.'
            : sortingAlgorithmName === 'MergeSort'
            ? 'The Merge Sort algorithm is a sorting algorithm that is based on the Divide and Conquer paradigm. In this algorithm, the array is initially divided into two equal halves and then they are combined in a sorted manner.'
            : sortingAlgorithmName === 'QuickSort'
            ? 'Like Merge Sort, QuickSort is a Divide and Conquer algorithm. It picks an element as a pivot and partitions the given array around the picked pivot. There are many different versions of quickSort that pick pivot in different ways. '
            : ''}
        </b>
      </div>
    </Container>
  )
})
