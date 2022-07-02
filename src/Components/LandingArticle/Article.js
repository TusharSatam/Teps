import React from 'react';
import { useTranslation } from 'react-i18next';
import { articleData } from '../../content/landingContent';
import './article.css'
const Article = () => {
    const { t } = useTranslation()
    return (
        <>
            <div className='container mt-5 d-none d-md-block'>
                <hr />
            </div>
            <section className='mx-3 mx-md-5'>
                <div className='mx-2 mx-md-3 d-flex align-items-center'>
                    <div className=' '>
                        <h1 className='article_title'>{t('landing_article_title')}</h1>
                        <div className='article_text'>
                            <p>{t('landing_article_sec_text')}</p>

                            <p className='my-3 my-md-4'>
                                {t('landing_article_third_text')}
                            </p>
                            <p className='list_article'>
                                1. {t('landing_article_list_1')}<br />
                                2. {t('landing_article_list_2')}<br />
                                3. {t('landing_article_list_3')}<br />
                                4. {t('landing_article_list_4')}<br />
                                5. {t('landing_article_list_5')}<br />
                                6. {t('landing_article_list_6')}
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