import { useState, useCallback, RefObject } from 'react'

// Change to import React's MouseEvent specifically
import type { MouseEvent as ReactMouseEvent } from 'react'

type DraggableHook = {
  onMouseDown: (e: ReactMouseEvent) => void
  onMouseMove: (e: ReactMouseEvent) => void
  onMouseUp: (e: ReactMouseEvent) => void
  onMouseLeave: (e: ReactMouseEvent) => void
}

export const useDraggable = (
  scrollerRef: RefObject<HTMLElement>
): DraggableHook => {
  const throttle = (func: () => void, delay: number) => {
    let timer: NodeJS.Timeout | null = null
    if (!timer) {
      timer = setTimeout(function () {
        timer = null
        func()
      }, delay)
    }
  }
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [startX, setStartX] = useState<number>(0)
  const [totalX, setTotalX] = useState<number>(0)

  // Use the DOM Event type, not React's MouseEvent
  const preventUnexpectedEvents = useCallback((e: Event) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const onDragStart = (e: ReactMouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
    const x = e.clientX
    setStartX(x)
    if (scrollerRef.current && 'scrollLeft' in scrollerRef.current) {
      setTotalX(x + scrollerRef.current.scrollLeft)
    }
  }

  const onDragEnd = (e: ReactMouseEvent) => {
    if (!isDragging) return
    if (!scrollerRef.current) return

    setIsDragging(false)

    const endX = e.clientX
    const childNodes = [
      ...(scrollerRef.current?.childNodes || []),
    ] as HTMLElement[]
    const dragDiff = Math.abs(startX - endX)

    // 지나치게 작은 범위 내로 드래그할 경우, 원래대로 클릭 이벤트가 동작하게끔 오차 범위 설정
    if (dragDiff > 10) {
      childNodes.forEach((child) => {
        // Add the event listener with the preventUnexpectedEvents function
        child.addEventListener('click', preventUnexpectedEvents)
      })
    } else {
      childNodes.forEach((child) => {
        // Remove the event listener with the same function reference
        child.removeEventListener('click', preventUnexpectedEvents)
      })
    }
  }

  const onDragMove = (e: ReactMouseEvent) => {
    if (!isDragging) return

    // Fix the throttle implementation and type issue

    throttle(function () {
      // Don't pass the React event to preventUnexpectedEvents
      // Instead, handle prevention directly
      e.preventDefault()
      e.stopPropagation()

      // 스크롤 포지션
      const scrollLeft = totalX - e.clientX

      if (scrollerRef.current && 'scrollLeft' in scrollerRef.current) {
        // 스크롤 발생
        scrollerRef.current.scrollLeft = scrollLeft
      }
    }, 100)
  }

  return {
    onMouseDown: onDragStart,
    onMouseMove: onDragMove,
    onMouseUp: onDragEnd,
    onMouseLeave: onDragEnd,
  }
}
