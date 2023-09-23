import TextEditor from "src/components/TextEditor";
import TextToSpeech from "src/components/TextToSpeech";

type TBlogWritingPageProps = {
  something: string;
};

const BlogWritingPage = () => {
  return (
    <div>
      <TextToSpeech text="Hey man, i just want to say that i love you">Click here</TextToSpeech>
      <TextEditor></TextEditor>
    </div>
  );
};

export default BlogWritingPage;
