import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import "./TextEditor.scss";
import axios from "axios";
const TextEditor = () => {
  const editorRef = useRef<TinyMCEEditor | null>();
  const [value, setValue] = useState<string>("");
  const [, setRawText] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const example_image_upload_handler = async (blobInfo: any, progress: any) => {
    const bodyFormData = new FormData();
    console.log(progress);
    bodyFormData.append("image", blobInfo.blob());
    const response = await axios({
      method: "post",
      url: "https://api.imgbb.com/1/upload?key=3c83bf0d94037028b0b4041a18bcb093",
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data.url;
  };
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
          "preview importcss directionality image link codesample nonbreaking insertdatetime advlist lists wordcount imagetools help quickbars emoticons",
        tinydrive_token_provider: "URL_TO_YOUR_TOKEN_PROVIDER",
        mobile: {
          plugins:
            "preview importcss directionality image link codesample nonbreaking insertdatetime advlist lists wordcount help charmap quickbars emoticons",
        },
        menu: {
          tc: {
            title: "Comments",
            items: "addcomment showcomments deleteallconversations",
          },
        },
        menubar: false,
        toolbar:
          "h1 h2 | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | forecolor backcolor emoticons | insertfile image link codesample | ltr rtl",
        autosave_ask_before_unload: true,
        image_advtab: true,
        image_class_list: [
          { title: "None", value: "" },
          { title: "Some class", value: "class-name" },
        ],
        importcss_append: true,
        body_class: "mce-content-body-v2",
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
        quickbars_selection_toolbar: "bold italic | quicklink h2 h3 blockquote quickimage",
        noneditable_noneditable_class: "mceNonEditable",
        toolbar_mode: "wrap",
        spellchecker_ignore_list: ["Ephox", "Moxiecode"],
        content_style: ".mymention{ color: gray; }",
        contextmenu: "link image imagetools table",
        a11y_advanced_options: true,
        _selector: ".mymention",
        _item_type: "profile",
        resize: false,
        automatic_uploads: true,
        // images_upload_url: "https://api.imgbb.com/1/upload?key=3c83bf0d94037028b0b4041a18bcb093",
        images_upload_handler: example_image_upload_handler,
      }}
    />
  );
};

export default TextEditor;
