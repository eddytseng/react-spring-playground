import { useState, useRef, useEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

export function usePrevious(value) {
	const ref = useRef()
	useEffect(() => void (ref.current = value), [value])
	return ref.current
}

export function useMeasure() {
	const ref = useRef()
	const [bounds, set] = useState({ height: 0 })
	const [ro] = useState(() => new ResizeObserver(([entry]) => {
		// console.log('entry', entry)
		return set(entry.contentRect) // setting with entry.target instead of entry.contentRect will not update ref sizes
	}))
	useEffect(() => {
		if (ref.current) ro.observe(ref.current)
		return () => ro.disconnect()
  	}, [])
	  
	return [{ ref }, bounds]
}
