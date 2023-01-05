import React from "react";

export default function DevelopmentalDomainIconSM({icon,text}) {
    return (
        <div className='d-flex flex-column align-items-center justify-content-center'>
            <div>
                <img title={text} width="20px" height="20px" src={icon} alt="" />
            </div>
            <p className='dev_dpm_text'>{text}</p>
        </div>
    );
}
