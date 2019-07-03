import React, { Fragment, useState, useEffect, useReducer } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import short from 'short-uuid'
import styled from 'styled-components';
import { animated, config, useTransition } from 'react-spring';
import { loremIpsum } from 'lorem-ipsum';

const translator = short();

const createInitialArray = (num) => {
	let initialItems = [];
	let i;
	for (i = 0; i < num; i++) {
		const item = {
			id: translator.generate(),
			text: loremIpsum(),
		}
		initialItems.push(item)
	}
	return initialItems;
}

const initialItems = createInitialArray(10);

const reducer = (state, action) => {
	switch(action.type) {
		case 'ADD':
			return state
		case 'REMOVE':
			return state.filter(item => item.id !== action.id)
		default:
			return state
	}
}

export default () => {
	const [refMap] = useState(() => new WeakMap());
	const [items, dispatch] = useReducer(reducer, initialItems);

	const observer = new ResizeObserver(entries => {
		entries.map(entry => console.log('entry', entry));
		console.log('DARKNESS!!!');
	})

	const transitions = useTransition(items, item => item.id, {
		config: config.gentle,
		enter: item => async next => {
			console.log('item', item);
			return await next({ opacity: 1, height: refMap.get(item).offsetHeight });
		},
		leave: { opacity: 0, height: 0, pointerEvents: 'none' }, // Set pointer events to none so that items underneat the element being animated are still clickable while animating
		from: { opacity: 0, height: 0, }
	});

	return (
		<Fragment>
			{transitions.map(({ item, props, key }) => {
				console.groupCollapsed(key);
				console.log('props', props);
				console.log('item', item);
				console.log('key', key)
				console.groupEnd();

				return (
					<animated.div 
						key={key}
						style={props}
					>
						<Row 
							ref={ref => {
								ref && refMap.set(item, ref);
								observer.observe(refMap.get(item));
							}}
						>
							<div>{item.text} / {key} / { item.id }</div>
							<button onClick={() => dispatch({ type: 'REMOVE', id: item.id })}>DELETE</button>
						</Row>
					</animated.div>
				)
			})}
		</Fragment>
	)
}

const Row = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;

	border-bottom: 1px solid lightgray;
	box-sizing: border-box;
	line-height: 20px;
	padding: 14px 16px 13px;
`