import TextEditor from "src/components/TextEditor";
import TextToSpeech from "src/components/TextToSpeech";

type TNewStoryPageProps = {
  something: string;
};

const NewStoryPage = () => {
  return (
    <div>
      <TextToSpeech text="Hey man, i just want to say that i love you">Click here</TextToSpeech>
      <TextEditor></TextEditor>
    </div>
  );
};

export default NewStoryPage;
