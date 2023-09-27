import { Editor } from "@tinymce/tinymce-react";
import { forwardRef, useState } from "react";
import { useMutation } from "react-query";
import { imageApi } from "src/apis/image.apis";
import { Editor as TinyMCEEditor } from "tinymce";
import "./TextEditor.scss";

type TTextEditorProps = {
  errorMsg?: string;
  onChange?: (newValue: string, editor: TinyMCEEditor) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  value: string;
};

const TextEditor = forwardRef<TinyMCEEditor, TTextEditorProps>(function TextEditorInner(
  { value, errorMsg, onChange, onBlur },
  ref,
) {
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
    <>
      <Editor
        onInit={(evt, editor) => {
          setRawText(editor.getContent({ format: "text" }));
          return ((ref as React.MutableRefObject<TinyMCEEditor>).current = editor);
        }}
        initialValue=""
        value={value}
        onBlur={onBlur as undefined}
        onEditorChange={onChange}
        apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
        init={{
          plugins:
            "preview importcss directionality image link codesample nonbreaking insertdatetime advlist lists wordcount help quickbars emoticons",
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
    </>
  );
});

export default TextEditor;
