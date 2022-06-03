import React from 'react';
import './article.css'
import sectionImage from '../../asstes/landing_image.svg'
const Article = () => {
    return (
        <section className='container d-flex align-items-center'>
            <article className='mx-3 mx-md-1'>
                <h1 className='article_title'>How TEPS works</h1>
                <div className='article_text'>
                    <p>Welcome to Things Education's Pedagogical Strategies or TEPS!</p>

                    <p className='my-4'>
                        We have simple-to-use teaching strategies that can be contextualised and used in your classrooms.
                        And they are very easy to access! Just follow these simple steps:
                    </p>
                    <p className='list_article'>
                        1. Log in or register. <br />
                        2. Choose the subject and grade for which you need the strategies.<br />
                        3. Choose the skill, topic, sub-topic and sub sub-topic from the dropdown menu.<br />
                        4. Once you click on the Find Strategies button, you will see a list of Learning
                        Outcomes and Teaching Strategies based on the Learning Outcomes.<br />
                        5. Feel free to make notes from the strategies given.<br />
                        6. Also note that you can save these strategies for later use or collect your favourite strategies.
                    </p>
                </div>
            </article>
            <div>
                <img className='d-none d-md-block' src={sectionImage} alt="sectionImg" />
            </div>
        </section>
    );
};

export default Article;