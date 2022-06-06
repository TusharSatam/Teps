import React from 'react';
import { Link } from 'react-router-dom';
import Article from '../LandingArticle/Article';
import './homelayout.css'
const HomeLayout = () => {
    return (
        <>
            <div className='d-flex flex-column justify-content-center align-items-center my-5'>
                <div className='my-3'>
                    <select className='px-md-3 px-1 py-md-2 bg-light mx-md-3 select-border' name="" id="">
                        <option value="" selected>Subject</option>
                        <option value="">data</option>
                        <option value="">data</option>
                        <option value="">data</option>
                    </select>
                    <select className='px-md-3 px-1 py-md-2 bg-light mx-2 mx-md-3 select-border ' name="" id="">
                        <option value="" selected>Grade</option>
                        <option value="">data</option>
                        <option value="">data</option>
                        <option value="">data</option>
                    </select>
                    <select className='px-md-3 px-1 py-md-2 bg-light mx-md-3 select-border' name="" id="">
                        <option value="" selected>Topic</option>
                        <option value="">data</option>
                        <option value="">data</option>
                        <option value="">data</option>
                    </select>
                    <select className='d-none d-md-inline px-1  px-md-3 py-md-2 bg-light mx-md-3 select-border' name="" id="">
                        <option value="" selected>Skill</option>
                        <option value="">data</option>
                        <option value="">data</option>
                        <option value="">data</option>
                    </select>
                </div>
                <div>
                    <select className='d-inline d-md-none px-1  px-md-3 py-md-2 bg-light mx-md-3 select-border' name="" id="">
                        <option value="" selected>Skill</option>
                        <option value="">data</option>
                        <option value="">data</option>
                        <option value="">data</option>
                    </select>
                    <select className=' px-1 px-md-3 py-md-2 bg-light mx-2 mx-md-3 select-border' name="" id="">
                        <option value="" selected>Sub - topic</option>
                        <option value="">data</option>
                        <option value="">data</option>
                        <option value="">data</option>
                    </select>
                    <select className=' px-1 px-md-3 py-md-2 bg-light mx-md-3 select-border' name="" id="">
                        <option value="" selected>Sub sub - topic</option>
                        <option value="">data</option>
                        <option value="">data</option>
                        <option value="">data</option>
                    </select>
                </div>
            </div>
            <div className='d-flex justify-content-center my-5'>
                <Link to='/search'><button className='submit_btn'>Find Strategies</button></Link>
            </div>
            <Article />
        </>
    );
};

export default HomeLayout;