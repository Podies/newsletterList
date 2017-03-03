import React from 'react';
import Header from './Header';

const Success = (props) => {
	return (
		<div>
			<Header {...props} />
			<div className="header-margin">
				<h2 className="heading-subscribe">Thank You for your input we will keep you posted.</h2>
			</div>
		</div>
	)
}

export default Success;
