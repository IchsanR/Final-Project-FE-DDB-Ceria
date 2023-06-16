import React from "react";

const Inputs = ({ id, label, placeholder, type, onChange }) => {
	return (
		<div className="flex flex-col">
			<label htmlFor={id} className="font-semibold mb-3">
				{label}
			</label>
			<input
				type={type}
				id={id}
				onChange={onChange}
				className="border-2 h-12 rounded-lg p-3"
				placeholder={placeholder}
			/>
		</div>
	);
};

export default Inputs;
