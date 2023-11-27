import { Editor } from "@tinymce/tinymce-react";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { getAllTemplates, updateTemplate } from "../../services/emailTemplate";
import toast, { Toaster } from "react-hot-toast";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import styles from "./styles/EmailTemplate.module.css";

const EmailTemplate = () => {
  const [allTemplates, setAllTemplates] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectOption, setSelectOption] = useState("Loading...");
  const [htmlContent, setHtmlContent] = useState("");
  const [refresh, setRefresh] = useState(0);
  const editorRef = useRef(null);

  function checkVariablesInHtml(html, requiredVar) {
    let missingVariables = [];

    // Loop through each required variable
    requiredVar.forEach((variable) => {
      // Check if the variable is present in the HTML content
      if (html.indexOf(variable) === -1) {
        missingVariables.push(variable);
      }
    });

    return missingVariables;
  }

  // Function to handle saving changes
  const handleSave = () => {
    const missingVars = checkVariablesInHtml(
      htmlContent,
      selectOption?.requiredVar
    );
    if (missingVars.length > 0) {
      toast.error("Missing variables: " + missingVars.join(", "));
      return;
    } else {
      updateTemplate(
        { ...selectOption, html: htmlContent },
        selectOption?.templateName
      )
        .then((res) => {
          toast.success("Template updated successfully");
          setRefresh((prev) => prev + 1);
        })
        .catch((err) => {
          console.log({ err });
          toast.error("Some error occured during update");
        });
    }
  };

  const editorHeight = window.innerHeight - 250;

  useEffect(() => {
    getAllTemplates()
      .then((res) => {
        if (res?.data !== undefined && res?.data !== null) {
          setAllTemplates(res?.data);
          if (
            selectOption === "Loading..." ||
            selectOption === undefined ||
            selectOption === null
          ) {
            setDropdownOptions(res?.data?.map((item) => item?.templateName)); // This is done because create template is not possible
            setSelectOption(res?.data[0]);
            setHtmlContent(res?.data[0]?.html);
          }
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  }, [refresh]);
  const changeOption = (e) => {
    const requiredTemplate = allTemplates.find(
      (obj) => obj?.templateName === e.value
    );
    setSelectOption(requiredTemplate);
    setHtmlContent(requiredTemplate?.html);

    if (editorRef?.current) {
      const editor = editorRef?.current?.editor;
      if (editor) {
        editor?.setContent(requiredTemplate?.html);

        // Reset undo and redo history
        editor?.undoManager?.clear();
      }
    }
  };
  return (
    <div className={styles?.container}>
      <Toaster position="top-right" reverseOrder={false} />
      <div className={styles.dropdownAndVars}>
        <Dropdown
          options={dropdownOptions}
          onChange={(e) => {
            changeOption(e);
          }}
          value={selectOption?.templateName}
          placeholder="Select an option"
        />
        <div className={styles.requiredVars}>
          {selectOption?.requiredVar?.map((item) => (
            <p>
              {item}
            </p>
          ))}
        </div>
      </div>
      <Editor
        ref={editorRef}
        apiKey="v8kz64f7joij68jmriuko8nb7cuby5xx4xqvucpwhs9ck6zp"
        value={htmlContent}
        init={{
          height: editorHeight,
          plugins:
            "preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed codesample table charmap pagebreak nonbreaking anchor tableofcontents insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker editimage help formatpainter permanentpen pageembed charmap mentions quickbars linkchecker emoticons advtable export footnotes mergetags autocorrect typography advtemplate",
          menubar: "file edit view insert format tools table tc help",
          toolbar:
            "undo redo | aidialog aishortcuts | blocks fontsizeinput | bold italic | align numlist bullist | link | table pageembed | lineheight  outdent indent | strikethrough forecolor backcolor formatpainter removeformat | charmap emoticons checklist | code fullscreen preview | save print export | pagebreak anchor codesample footnotes mergetags | ltr rtl casechange | spellcheckdialog a11ycheck",
          autosave_ask_before_unload: false,
        }}
        onEditorChange={(content, editor) => {
          setHtmlContent(content);
        }}
      />

      {/* Additional UI elements */}
      <button className="change_btn mt-3" onClick={handleSave}>
        <p style={{ fontSize: "16px" }} className="p-0 m-0">
          Save Changes
        </p>
      </button>
    </div>
  );
};

export default EmailTemplate;
