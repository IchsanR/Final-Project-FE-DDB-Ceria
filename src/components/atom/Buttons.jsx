import React, { Fragment } from "react";

const Buttons = ({ type, classname, description, onClick }) => {
	return (
		<Fragment>
			<button type={type} className={classname} onClick={onClick}>
				{description}
			</button>
		</Fragment>
	);
};

export default Buttons;
