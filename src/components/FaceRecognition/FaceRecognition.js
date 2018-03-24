import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, faces }) => {
	let boxes = [];
	for (let i = 0, l = faces.length; i < l; i++) {
		boxes[i] =
			<div
				key={i}
				className='bounding-box'
				style={{
					top: faces[i].topRow,
					right: faces[i].rightCol,
					bottom: faces[i].bottomRow,
					left: faces[i].leftCol
				}}>
			</div>;
	}
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img
					id='inputimage'
					alt=''
					src={imageUrl}
					width='500px'
					height='auto'
				/>
				{boxes}
			</div>
		</div>
	);
}

export default FaceRecognition;