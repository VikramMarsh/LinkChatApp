import React from 'react';

const Test=({match})=>{


	return(
		<div>
		<h1>{match.params.topicId}</h1>
		</div>
	);
}
export default Test;