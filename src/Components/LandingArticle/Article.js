import React from 'react';
import './article.css'
import sectionImage from '../../asstes/landing_image.svg'
const Article = () => {
    const articleData = {
        heading: "Welcome to Things Education's Pedagogical Strategies or TEPS!",
        subHeading: " We have simple-to-use teaching strategies that can be contextualised and used in your classrooms. And they are very easy to access! Just follow these simple steps:",
        description1: " 1. Log in or register.",
        description2: "2. Choose the subject and grade for which you need the strategies.",
        description3: "3. Choose the skill, topic, sub-topic and sub sub-topic from the dropdown menu.",
        description4: "4. Once you click on the Find Strategies button, you will see a list of Learning Outcomes and Teaching Strategies based on the Learning Outcomes.",
        description5: "5. Feel free to make notes from the strategies given.",
        description6: "6. Also note that you can save these strategies for later use or collect your favourite strategies.",
        img: sectionImage
    }
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