import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
	return (
		<div>
			<p className='f3'>
				{'The Smart Brain will detect faces in your pictures. Give it a try.'}
			</p>
			<div className='center'>
				<div className='form center pa4 br3 shadow-5'>
					<input onChange={onInputChange}
						className='f4 pa2 w-60 center'
						type='text'
						placeholder='URL of an image'
					/>
					<button onClick={onButtonSubmit} className='w-40 grow f4 link ph3 pv2 dib white bg-dark-blue'>Detect</button>
				</div>
			</div>

		</div>
	);
}

export default ImageLinkForm;