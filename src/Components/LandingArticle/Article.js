import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import LanguageSelect from '../../languageSelect';
import LandingImage from '../../asstes/landing_image.svg'
import './article.css'
const Article = () => {
  const { t } = useTranslation();
  const location = useLocation();
  return (
    <>
      <div className={location.pathname !== '/' ? 'container mt-2 mt-md-5 ' : 'container mt-3 d-none d-md-block'}>
        <hr className='hr_line' />
      </div>
      {
        location.pathname !== '/home' ?
          <div className='d-none d-md-block'>
            <div className='mx-3 mx-md-5 d-flex justify-content-end langMerg'>
              <LanguageSelect />
            </div>
          </div> : <></>
      }
      <section className='mx-3 mx-md-5 mb-5 mb-md-0'>
        <div className='mx-2 mx-md-3 d-flex align-items-center'>
          <div className=' '>
            <div className='d-flex justify-content-between mt-2 mb-4'>
              <h1 className='article_title'>{t('How TEPS works')}</h1>
              {
                location.pathname !== '/home' ?
                  <div className='d-block d-md-none mt-1'>
                    <div>
                      <LanguageSelect />
                    </div>
                  </div> : <></>
              }
            </div>
            <div className='article_text'>
              <p>{t('Welcome to Things Education Pedagogical Strategies or TEPS!')}</p>

              <p className='my-3 my-md-4'>
                {t('We have simple-to-use teaching strategies that can be contextualised and used in your classrooms. And they are very easy to access! Just follow these simple steps:')}
              </p>
              <ol className={location.pathname === "/home" ? "list_home_article" : "list_article"}>
                <li>{t('Log in or register.')}</li>
                <li>{t('Choose the subject and grade for which you need the strategies.')}</li>
                <li>{t('Choose the skill, topic, sub-topic and sub sub-topic from the dropdown menu.')}</li>
                <li>{t('Once you click on the Find Strategies button, you will see a list of Learning Outcomes and Teaching Strategies based on the Learning Outcomes.')}</li>
                <li>{t('Feel free to make notes from the strategies given.')}</li>
                <li>{t('Also note that you can save these strategies for later use or collect your favourite strategies.')}</li>
              </ol>
              {
                location.pathname === '/home' &&
                <div>
                  <h4 className='d-none d-md-block'>Want to upload your own strategy and contribute to <br /> the TEPS community?</h4>
                  <p className='d-block d-md-none mb-1' style={{ fontSize: "16px", fontWeight: "500", lineHeight: "20px" }}>Want to upload your own strategy and contribute to the TEPS community?</p>
                  <Link to="/addForm"> <button className='home_btn'>Upload Strategy</button></Link>
                </div>
              }
            </div>
          </div>
          <div className='d-none d-md-block'>
            <img className='article_image' src={LandingImage} alt="sectionImg" />
          </div>
        </div>
      </section>

    </>
  );
};

export default Article;