import React from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";


const LanguageSelect = () => {
    const { t } = useTranslation()
    const handleLanguageSelect = (e) => {
        if (e.target.value === 'English') {
            i18next.changeLanguage('en')
        }
        else if (e.target.value === 'अंग्रेज़ी') {
            i18next.changeLanguage('en')
        }
        else (i18next.changeLanguage('hi'))
    }
    return (
        <>
            <select onChange={handleLanguageSelect} className='language_btn mx-3' name="" id="">
                <option disabled selected>{t('language')}</option>
                <option>{t('english')}</option>
                <option>{t('hindi')}</option>
            </select>
            {/* <button
                onClick={() => {
                    i18next.changeLanguage('en')
                }}
            >
                English
            </button>
            <button
                onClick={() => {
                    i18next.changeLanguage('hi')
                }}
            >
                हिन्दी
            </button> */}
        </ >
    );
};

export default LanguageSelect;
