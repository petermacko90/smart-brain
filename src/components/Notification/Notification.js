import React from 'react';
import './Notification.css';

class Notification extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: true
		}
	}

	onCloseClick = () => {
		this.setState({ show: false });
	}

	render() {
		return(
			this.state.show ?
				<div className='notification'>{this.props.text}
					<span className='closeIcon' onClick={this.onCloseClick}> &times;</span>
				</div>
			: null
		);
	}
}

export default Notification;