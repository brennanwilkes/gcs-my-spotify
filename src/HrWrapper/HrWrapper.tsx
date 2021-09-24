import React from "react";
import "./hrWrapper.css";

export const HrWrapper = ({ children, style, className } : { children: any, style?: React.CSSProperties, className?: string }) => (
	<div style={style ?? {}} className={`HrWrapper ${className ?? ""}`}>{
		children
	}</div>
);
