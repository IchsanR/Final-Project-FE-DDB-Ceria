import React, { Fragment } from "react";

const Buttons = ({ type, classname, description, onClick, disabled }) => {
	return (
		<Fragment>
			<button type={type} className={classname} onClick={onClick} disabled={disabled}>
				{description}
			</button>
		</Fragment>
	);
};

export default Buttons;
