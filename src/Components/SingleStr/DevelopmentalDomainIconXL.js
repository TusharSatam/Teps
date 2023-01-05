import React from "react";

export default function DevelopmentalDomainIconXL({ icon, text }) {
    return (
        <div className='d-flex dev_dom_single align-items-center p-xl-2 p-md-1'>
            <img title="Cognitive Sensory" className='threeIcons' height={'60px'} width={'60px'} src={icon} alt="" />
            <p className='dev_dpm_text p-1'>{text}</p>
        </div>
    );
}
