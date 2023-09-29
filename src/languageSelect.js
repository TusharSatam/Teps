import React from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useAuth } from "./Context/AuthContext";


const LanguageSelect = () => {
    const { t } = useTranslation();
    const { setselectLang } = useAuth();
    const handleLanguageSelect = (e) => {
        if (e.target.value === 'English') {
            i18next.changeLanguage('en')
            setselectLang('english')
        }
        else {
            i18next.changeLanguage('hi')
            setselectLang('hindi')
        }
    }
    return (
        <>
            <select onChange={handleLanguageSelect} className='language_btn mx-1 mx-md-3' name="" id="">
                <option disabled selected>Language</option>
                <option>English</option>
                <option>हिंदीं</option>
            </select>
        </ >
    );
};

export default LanguageSelect;
