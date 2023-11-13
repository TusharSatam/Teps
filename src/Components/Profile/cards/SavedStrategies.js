import React, { useEffect } from 'react'
import SaveIcon from "../../../asstes/icons/Save.svg";
import SavedIcon from "../../../asstes/icons/Saved.svg";
import { Link } from 'react-router-dom';
import { useAuth } from '../../../Context/AuthContext';
const SavedStrategies = () => {
    const {user}=useAuth() 
  const [languageSelect, setLanguageSelect] = React.useState("en");
  const language = localStorage.getItem("i18nextLng");
    React.useEffect(() => {
        if (language === "hi") {
          setLanguageSelect("hi");
        } else {
          setLanguageSelect("en");
        }
      }, [language]);

      
  return (
    <section className="created">
    <div className="Card outcomeList">
      <div className="d-flex">
        <h2>Project-Based Learning</h2>
        <div className="iconWrap">
          <img src={SavedIcon} alt="save" />
        </div>
      </div>
        <p>
          1)Inform students what the term 'character' means: a person
          or animal that says, does and feels things in a story. Ask a
          few students to name and act like their favorite character
          from a story or movie. As you read the story, pause and ask
          students to repeat words said or actions done by characters
          in that story.
        </p>
        <Link>Read more</Link>
    </div>
  </section>
  )
}

export default SavedStrategies