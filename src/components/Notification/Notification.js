import React from 'react';
import './Notification.css';

class Notification extends React.Component {
	render() {
		return (
			<div	className='notification unselectable'	title='Dismiss'
				onClick={this.props.onClick}>{this.props.text}
			</div>
		);
	}
}

export default Notification;