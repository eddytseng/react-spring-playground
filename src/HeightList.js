import React, { useState } from 'react';
// import short from 'short-uuid'
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';
// import { loremIpsum } from 'lorem-ipsum';
import { useMeasure } from './helpers'

// const translator = short();

// const createInitialArray = (num) => {
// 	let initialItems = [];
// 	let i;
// 	for (i = 0; i < num; i++) {
// 		const item = {
// 			id: translator.generate(),
// 			text: loremIpsum(),
// 		}
// 		initialItems.push(item)
// 	}
// 	return initialItems;
// }

// const initialItems = createInitialArray(10);

// const reducer = (state, action) => {
// 	switch(action.type) {
// 		case 'ADD':
// 			return state
// 		case 'REMOVE':
// 			return state.filter(item => item.id !== action.id)
// 		default:
// 			return state
// 	}
// }

const HeightList = (props) => {
	const [isOpen, setOpen] = useState(true)
	const [bind, { height: viewHeight }] = useMeasure()
	const { height, opacity, transform } = useSpring({
		from: { height: 0, opacity: 0, transform: 'translate3d(0px,0,0)' },
		to: { height: isOpen ? viewHeight : 0, opacity: isOpen ? 1 : 0, transform: `translate3d(${isOpen ? 0 : 20}px,0,0)` }
	})

	// useEffect(() => {
	// 	console.log(bind.ref.current)
	// 	console.log('bind', bind)
	// 	console.log(`${viewWidth} W x ${viewHeight} H`);
	// 	console.log('height', viewHeight)
	// }, [bind])

	// You must add an extra div for 2 reasons
	// 1) You cannot get the clientHeight or offsetHeight with entry.contentRect using useMeasure()
	// 2) If you use entry.target in order to try to get clientHeight or offsetHeight, the ref's size will not update on resize

	return (
		<animated.div
			onClick={() => setOpen(!isOpen)}
			style={{ height, opacity, transform }} 
		>
			<div {...bind}> 
				<StyledDiv>
					{props.children} - <span>{isOpen ? 'OPENED' : 'CLOSED'}</span>	
				</StyledDiv>
			</div>
		</animated.div>
	)
}

export default HeightList;

const StyledDiv = styled.div`
	background-color: rgba(0,0,255,0.3);
	border-bottom: 1px solid lime;
	box-sizing: border-box;
	padding: 16px;
`