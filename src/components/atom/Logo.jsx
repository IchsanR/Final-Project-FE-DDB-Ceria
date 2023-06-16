import React, { Fragment } from "react";
import { logoBRI, logoCeria } from "../../assets";

const Logo = () => {
	return (
		<Fragment>
			<div className="flex">
				<div className="w-[120px] h-[45px] mr-3">
					<img src={logoBRI} alt="BRI" className="w-full h-full" />
				</div>
				<div className="border" />
				<div className="w-[120px] h-[45px] ml-3">
					<img src={logoCeria} alt="Ceria" className="w-full h-full" />
				</div>
			</div>
		</Fragment>
	);
};

export default Logo;
