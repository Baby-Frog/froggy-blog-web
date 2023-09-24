import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";
import "./TextEditor.scss";
import axios from "axios";
import { useMutation } from "react-query";
import { storyApi } from "src/apis/story.apis";
import { toast } from "react-toastify";
const TextEditor = () => {
  const editorRef = useRef<TinyMCEEditor | null>();
  const [value, setValue] = useState<string>("");
  const [, setRawText] = useState<string>("");

  const uploadImageMutation = useMutation({
    mutationFn: storyApi.uploadImage,
  });

  // I was forced to use "any" because tiny-mce react documentation is so stupid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const example_image_upload_handler = async (blobInfo: any, progress: any) => {
    const bodyFormData = new FormData();
    bodyFormData.append("file", blobInfo.blob());
    const result = await uploadImageMutation.mutateAsync(bodyFormData, {
      onSuccess: (data) => {
        console.log(data);
        return data.data.urlImage;
      },
      onError: (error) => {
        console.log(error);
        toast.error(error as string);
      },
    });
    console.log(result);
    return "";
    // const response = await axios({
    //   method: "post",
    //   url: import.meta.env.VITE_LOCAL_IMAGE_UPLOAD_API_URL,
    //   data: bodyFormData,
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });
    // return response.data.data.urlImage;
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
        // images_upload_url: "https://api.imgbb.com/1/upload?key=3c83bf0d94037028b0b4041a18bcb093",
        images_upload_handler: example_image_upload_handler,
      }}
    />
  );
};

export default TextEditor;
