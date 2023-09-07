import React from 'react';
import myflix from '../images/Myflix-logo.svg'

const Header = () => {
	return (
		<div className="myflix-header">
			<img src={myflix} alt="Myflix Logo"/>
		</div>
	)
}

export {
	Header
}