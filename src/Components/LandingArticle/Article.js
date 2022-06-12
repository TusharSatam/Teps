import React from 'react';
import { articleData } from '../../content/landingContent';
import './article.css'
const Article = () => {

    return (
        <>
            <div className='container mt-5 d-none d-md-block'>
                <hr />
            </div>
            <section className='mx-3 mx-md-5'>
                <div className='mx-2 mx-md-3 d-flex align-items-center'>
                    <div className=' '>
                        <h1 className='article_title'>How TEPS works</h1>
                        <div className='article_text'>
                            <p>{articleData.heading}</p>

                            <p className='my-3 my-md-4'>
                                {articleData.subHeading}
                            </p>
                            <p className='list_article'>
                                {articleData.description1}<br />
                                {articleData.description2}<br />
                                {articleData.description3}<br />
                                {articleData.description4}<br />
                                {articleData.description5}<br />
                                {articleData.description6}
                            </p>
                        </div>
                    </div>
                    <div className='d-none d-md-block'>
                        <img className='article_image' src={articleData.img} alt="sectionImg" />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Article;