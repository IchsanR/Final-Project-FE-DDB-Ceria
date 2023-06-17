import React, { Fragment } from "react";
import { logoBRI, logoCeria } from "../../assets";

const Logo = () => {
	return (
		<Fragment>
			<div className="flex">
				<div className="w-[80px] h-[28px] mr-3">
					<img src={logoBRI} alt="BRI" className="w-full h-full" />
				</div>
				<div className="border" />
				<div className="w-[80px] h-[28px] ml-3">
					<img src={logoCeria} alt="Ceria" className="w-full h-full" />
				</div>
			</div>
		</Fragment>
	);
};

export default Logo;
