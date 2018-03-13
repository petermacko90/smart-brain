import React from 'react';

const Rank = ({name, entries}) => {
	return (
		<div className='white f3'>
			{`${name}, your current entry count is: ${entries}.`}
		</div>
	);
}

export default Rank;