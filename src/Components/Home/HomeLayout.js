import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Article from '../LandingArticle/Article';
import './homelayout.css'
const HomeLayout = () => {
    const { t } = useTranslation()
    return (
        <>
            <div className='d-flex flex-column justify-content-center align-items-center my-5'>
                <div className='my-3'>
                    <select className='px-md-3 px-1 py-md-2 bg-light mx-md-3 select-border' name="" id="">
                        <option value="" selected>{t('subject')}</option>
                        <option value="">data</option>
                        <option value="">data</option>
                        <option value="">data</option>
                    </select>
                    <select className='px-md-3 px-1 py-md-2 bg-light mx-2 mx-md-3 select-border ' name="" id="">
                        <option value="" selected>{t('grade')}</option>
                        <option value="">data</option>
                        <option value="">data</option>
                        <option value="">data</option>
                    </select>
                    <select className='px-md-3 px-1 py-md-2 bg-light mx-md-3 select-border' name="" id="">
                        <option value="" selected>{t('topic')}</option>
                        <option value="">data</option>
                        <option value="">data</option>
                        <option value="">data</option>
                    </select>
                    <select className='d-none d-md-inline px-1  px-md-3 py-md-2 bg-light mx-md-3 select-border' name="" id="">
                        <option value="" selected>{t('skill')}</option>
                        <option value="">data</option>
                        <option value="">data</option>
                        <option value="">data</option>
                    </select>
                </div>
                <div>
                    <select className='d-inline d-md-none px-1  px-md-3 py-md-2 bg-light mx-md-3 select-border' name="" id="">
                        <option value="" selected>{t('skill')}</option>
                        <option value="">data</option>
                        <option value="">data</option>
                        <option value="">data</option>
                    </select>
                    <select className=' px-1 px-md-3 py-md-2 bg-light mx-2 mx-md-3 select-border' name="" id="">
                        <option value="" selected>{t('sub_topic')}</option>
                        <option value="">data</option>
                        <option value="">data</option>
                        <option value="">data</option>
                    </select>
                    <select className=' px-1 px-md-3 py-md-2 bg-light mx-md-3 select-border' name="" id="">
                        <option value="" selected>{t('sub_sub_topic')}</option>
                        <option value="">data</option>
                        <option value="">data</option>
                        <option value="">data</option>
                    </select>
                </div>
            </div>
            <div className='d-flex justify-content-center my-5 pt-5'>
                <Link to='/search'><button className='submit_btn'>{t('find_strategies')}</button></Link>
            </div>
            <Article />
        </>
    );
};

export default HomeLayout;