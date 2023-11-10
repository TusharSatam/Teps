import { Editor } from "@tinymce/tinymce-react";
import React, { useState } from "react";

const EmailTemplate = () => {
  const [teachingStrategy, setTeachingStrategy] = useState("");
  const [htmlContent, setHtmlContent] = useState(`
  <p>Hello \${user?.firstName},</p>
  <p>We are glad to inform you that your strategy (shown below) has been approved and will be shown with the rest of the strategies to all the members of the community. We thank you for your contribution to the community of educators.</p><br />
  <p>Regards,</p>
  <p>Things Education Team</p>
  <p>\${response?.data[0]["Teaching Strategy"]}</p>
  `);

  // Function to handle saving changes
  const handleSave = () => {
    // Implement logic to save the edited HTML content
    console.log("Saving HTML content:", htmlContent);
  };

  return (
    <div>
      <Editor
        apiKey="v8kz64f7joij68jmriuko8nb7cuby5xx4xqvucpwhs9ck6zp"
        value={htmlContent}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
        }}
        onEditorChange={(content, editor) => {
          setHtmlContent(content);
        }}
      />
      {/* Additional UI elements */}
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default EmailTemplate;
