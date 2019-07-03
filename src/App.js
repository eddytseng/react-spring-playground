import React from 'react';
import { loremIpsum } from 'lorem-ipsum';
import HeightList from './HeightList';

function App() {

	return (
		<div>			
			<HeightList>{loremIpsum()}</HeightList>
			<HeightList>{loremIpsum()}</HeightList>
			<HeightList>{loremIpsum()}</HeightList>
			<HeightList>{loremIpsum()}</HeightList>
			<HeightList>{loremIpsum()}</HeightList>
		</div>
	)
}

export default App;