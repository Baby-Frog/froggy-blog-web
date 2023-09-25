import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import "./TextEditor.scss";
import { useMutation } from "react-query";
import { imageApi } from "src/apis/image.apis";

type TTextEditorProps = {
  textEditorValue: string;
  setTextEditorValue: React.Dispatch<React.SetStateAction<string>>;
};

const TextEditor = ({ setTextEditorValue, textEditorValue }: TTextEditorProps) => {
  const editorRef = useRef<TinyMCEEditor | null>();
  const [, setRawText] = useState<string>("");
  const uploadImageMutation = useMutation({
    mutationFn: imageApi.uploadImage,
  });

  // I was forced to use "any" because tiny-mce react documentation is so stupid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUploadImage = async (blobInfo: any, progress: any) => {
    const bodyFormData = new FormData();
    bodyFormData.append("file", blobInfo.blob());
    const result = await uploadImageMutation.mutateAsync(bodyFormData);
    return result.data.data.urlImage;
  };
  return (
    <Editor
      onInit={(evt, editor) => {
        setRawText(editor.getContent({ format: "text" }));
        return (editorRef.current = editor);
      }}
      initialValue=""
      value={textEditorValue}
      onEditorChange={(newValue, editor) => {
        setTextEditorValue(newValue);
        setRawText(editor.getContent({ format: "text" }));
      }}
      apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
      init={{
        plugins:
          "preview importcss directionality image link codesample nonbreaking insertdatetime advlist lists wordcount help quickbars emoticons",
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
        image_class_list: [
          { title: "None", value: "" },
          { title: "Some class", value: "class-name" },
        ],
        importcss_append: true,
        body_class: "mce-content-body-v2",
        height: 600,
        image_caption: true,
        quickbars_selection_toolbar: "bold italic | quicklink h2 h3 blockquote quickimage",
        noneditable_noneditable_class: "mceNonEditable",
        toolbar_mode: "wrap",
        spellchecker_ignore_list: ["Ephox", "Moxiecode"],
        content_style: ".mymention{ color: gray; }",
        contextmenu: "link image table",
        a11y_advanced_options: true,
        _selector: ".mymention",
        _item_type: "profile",
        resize: false,
        automatic_uploads: true,
        images_upload_handler: handleUploadImage,
      }}
    />
  );
};

export default TextEditor;
