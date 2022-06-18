import React from 'react';

const DashStratigys = () => {
    return (
        <div>
            <div className='stratigy_bg'>
                <div className='d-flex flex-column justify-content-center align-items-center py-5 my-3'>
                    <div className='my-3 '>
                        <select className='px-3 py-2 bg-light mx-3 select-border' name="" id="">
                            <option value="" selected>Grade</option>
                            <option value="">data</option>
                            <option value="">data</option>
                            <option value="">data</option>
                        </select>
                        <select className='px-3 py-2 bg-light mx-3' name="" id="">
                            <option value="" selected>Subject</option>
                            <option value="">data</option>
                            <option value="">data</option>
                            <option value="">data</option>
                        </select>
                        <select className='px-3 py-2 bg-light mx-3' name="" id="">
                            <option value="" selected>Topic</option>
                            <option value="">data</option>
                            <option value="">data</option>
                            <option value="">data</option>
                        </select>
                        <select className='d-none d-md-inline px-3 py-2 bg-light mx-3' name="" id="">
                            <option value="" selected>Skill</option>
                            <option value="">data</option>
                            <option value="">data</option>
                            <option value="">data</option>
                        </select>
                    </div>
                    <div>
                        <select className='d-inline d-md-none px-3 py-2 bg-light mx-3' name="" id="">
                            <option value="" selected>Skill</option>
                            <option value="">data</option>
                            <option value="">data</option>
                            <option value="">data</option>
                        </select>
                        <select className='px-3 py-2 bg-light mx-3' name="" id="">
                            <option value="" selected>Sub - topic</option>
                            <option value="">data</option>
                            <option value="">data</option>
                            <option value="">data</option>
                        </select>
                        <select className='px-3 py-2 bg-light mx-3' name="" id="">
                            <option value="" selected>Sub sub - topic</option>
                            <option value="">data</option>
                            <option value="">data</option>
                            <option value="">data</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashStratigys;