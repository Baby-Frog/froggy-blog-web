import { Editor } from "@tinymce/tinymce-react";
import { forwardRef, useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { imageApi } from "src/apis/image.apis";
import { Editor as TinyMCEEditor } from "tinymce";
import "./TextEditor.scss";
import ErrorToastIcon from "../Icon/ToastIcon/ErrorToastIcon";

type TTextEditorProps = {
  value: string;
  errorMsg?: string;
  rawText: string;
  onChange?: (newValue: string, editor: TinyMCEEditor) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  setRawText: React.Dispatch<React.SetStateAction<string>>;
};

const THREE_MEGABYTE_TO_BYTES = 3 * 1024 * 1024;

const TextEditor = forwardRef<TinyMCEEditor, TTextEditorProps>(function TextEditorInner(
  { value, errorMsg, rawText, setRawText, onChange, onBlur },
  ref,
) {
  const uploadImageMutation = useMutation({
    mutationFn: imageApi.uploadImage,
  });

  // I was forced to use "any" because tiny-mce react documentation is so stupid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUploadImage = (blobInfo: any, progress: any) =>
    new Promise((resolve, reject) => {
      if (blobInfo.blob().size > THREE_MEGABYTE_TO_BYTES) {
        toast.error("Your image size is too big, we only accept image size under 3MB", {
          icon: (
            <ErrorToastIcon
              width={40}
              height={40}
            />
          ),
        });
        reject({ message: "Your image size is too big, we only accept image size under 3MB", remove: true });
        return;
      }
      if (blobInfo.blob() && !blobInfo.blob().type.includes("image") && blobInfo.blob()?.type.includes("gif")) {
        toast.error(<div className="text-sm">Wrong file format, we only accept .JPEG, .PNG, .JPG file format</div>, {
          icon: (
            <ErrorToastIcon
              width={40}
              height={40}
            />
          ),
        });
        reject({ message: "Wrong file format, we only accept .JPEG, .PNG, .JPG file format", remove: true });
        return;
      }
      const bodyFormData = new FormData();
      bodyFormData.append("file", blobInfo.blob());
      uploadImageMutation.mutateAsync(bodyFormData).then((result) => {
        return result.data.data.urlImage;
      });
    });
  //   if (blobInfo.blob().size > THREE_MEGABYTE_TO_BYTES) {
  //     toast.error("Your image size is too big, we only accept image size under 3MB", {
  //       icon: (
  //         <ErrorToastIcon
  //           width={40}
  //           height={40}
  //         />
  //       ),
  //     });
  //     return;
  //   }
  //   if ((blobInfo.blob() && !blobInfo.blob().type.includes("image")) || !blobInfo.blob()?.type.includes("gif")) {
  //     toast.error(<div className="text-sm">Wrong file format, we only accept .JPEG, .PNG, .JPG file format</div>, {
  //       icon: (
  //         <ErrorToastIcon
  //           width={40}
  //           height={40}
  //         />
  //       ),
  //     });
  //     return;
  //   }
  //   const bodyFormData = new FormData();
  //   bodyFormData.append("file", blobInfo.blob());
  //   const result = await uploadImageMutation.mutateAsync(bodyFormData);
  //   return result.data.data.urlImage;
  return (
    <>
      <Editor
        onInit={(evt, editor) => {
          setRawText(editor.getContent({ format: "text" }));
          console.log(rawText);
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
          content_style:
            "* { color: #242424; word-break: break-word; } mark { background-color: yellowgreen; } figcaption { text-align: center; margin-bottom: 8px; color: #6b6b6b; } p { line-height: 32px; font-size: 20px; font-weight: 400; margin-bottom: 16px; } h1 { font-size: 24px; font-weight: 600; letter-spacing: -0.3px; line-height: 30px; margin-top: 16px; } h2 { line-height: 24px; font-size: 20px; font-weight: 600; margin-top: 12px; } ol { list-style: decimal; font-size: 20px; } ul { list-style: disc; font-size: 20px; }",
          contextmenu: "link image table",
          a11y_advanced_options: true,
          _selector: "textarea",
          _item_type: "profile",
          resize: false,
          content_css: "p{color:red;}" + new Date().getTime(),
          //@ts-ignore
          images_upload_handler: handleUploadImage,
        }}
      />
    </>
  );
});

export default TextEditor;
