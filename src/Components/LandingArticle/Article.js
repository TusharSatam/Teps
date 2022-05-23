import React from 'react';
import './article.css'

const Article = () => {
    return (
        <section className='container'>
            <article className='mx-3 mx-md-1'>
                <h1 className='article_title'>How TEPS works</h1>
                <div className='article_text'>
                    <p>Welcome to Things Education’s Pedagogical Strategies or TEPS!</p>

                    <p className='my-4'>
                        We have simple to use teaching strategies which can be contextualised and used in your
                        classrooms. And they are very easy to access! Just follow these simple steps:
                    </p>
                    <p className='list_article'>
                        1. Log in or sign up. <br />
                        2. Choose the subject and grade for which you need the strategies for.<br />
                        3. Choose skill, topic, sub-topic from the drop-down menu.<br />
                        4. Once you click on the Find Strategies button, you will see a list of Learning Outcomes
                        and Teaching Strategies based on the Learning Outcomes.<br />
                        5. Feel free to make notes from the strategies given.<br />
                        6. Also note that you can save these strategies for later use or can also collect your
                        favourite strategies.
                    </p>
                </div>
            </article>
        </section>
    );
};

export default Article;