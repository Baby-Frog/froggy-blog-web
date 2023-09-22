import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import "./TextEditor.scss";
const TextEditor = () => {
  const editorRef = useRef<TinyMCEEditor | null>();
  const [value, setValue] = useState<string>("");
  const [rawText, setRawText] = useState<string>("");

  return (
    <Editor
      onInit={(evt, editor) => {
        setRawText(editor.getContent({ format: "text" }));
        return (editorRef.current = editor);
      }}
      initialValue=""
      value={value}
      onEditorChange={(newValue, editor) => {
        setValue(newValue);
        setRawText(editor.getContent({ format: "text" }));
      }}
      apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
      init={{
        plugins:
          "print preview importcss directionality image link codesample table hr nonbreaking insertdatetime advlist lists wordcount imagetools textpattern noneditable help quickbars linkchecker emoticons",
        tinydrive_token_provider: "URL_TO_YOUR_TOKEN_PROVIDER",
        mobile: {
          plugins:
            "print preview importcss directionality image link codesample table hr nonbreaking insertdatetime advlist lists wordcount textpattern noneditable help charmap quickbars linkchecker emoticons",
        },
        menu: {
          tc: {
            title: "Comments",
            items: "addcomment showcomments deleteallconversations",
          },
        },
        menubar: false,
        toolbar:
          "bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist  | forecolor backcolor removeformat | pagebreak | emoticons | insertfile image link codesample | ltr rtl",
        autosave_ask_before_unload: true,
        image_advtab: true,
        link_list: [
          { title: "My page 1", value: "https://www.tiny.cloud" },
          { title: "My page 2", value: "http://www.moxiecode.com" },
        ],
        image_list: [
          { title: "My page 1", value: "https://www.tiny.cloud" },
          { title: "My page 2", value: "http://www.moxiecode.com" },
        ],
        image_class_list: [
          { title: "None", value: "" },
          { title: "Some class", value: "class-name" },
        ],
        importcss_append: true,
        templates: [
          {
            title: "New Table",
            description: "creates a new table",
            content:
              '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
          },
          { title: "Starting my story", description: "A cure for writers block", content: "Once upon a time..." },
          {
            title: "New list with dates",
            description: "New List with dates",
            content:
              '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
          },
        ],
        template_cdate_format: "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
        template_mdate_format: "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
        height: 600,
        image_caption: true,
        quickbars_selection_toolbar: "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
        noneditable_noneditable_class: "mceNonEditable",
        toolbar_mode: "wrap",
        spellchecker_ignore_list: ["Ephox", "Moxiecode"],
        content_style: ".mymention{ color: gray; }",
        contextmenu: "link image imagetools table",
        a11y_advanced_options: true,
        _selector: ".mymention",
        _item_type: "profile",
        // images_upload_handler: function (blobInfo, success) {

        // }
      }}
    />
  );
};

export default TextEditor;
