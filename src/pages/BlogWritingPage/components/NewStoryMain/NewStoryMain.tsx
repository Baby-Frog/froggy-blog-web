import { useForm } from "react-hook-form";
import Input from "src/components/Input";
import Label from "src/components/Label";
import TextEditor from "src/components/TextEditor";
import { styled } from "styled-components";
import { Select } from "antd";
type TNewStoryMainProps = {
  something: string;
};

const NewStoryMainWrapper = styled.div`
  flex: 7.5;
  margin: 0 auto;
`;

const NewStoryHeading = styled.h1`
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 56px;
`;

const GridRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const NewStoryMain = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
  });
  return (
    <NewStoryMainWrapper>
      <NewStoryHeading>Write your new story 🚀</NewStoryHeading>
      <GridRow>
        <FlexColumn>
          <Label htmlFor="title">Your story title</Label>
          <Input
            name="title"
            register={register}
          ></Input>
        </FlexColumn>
        <FlexColumn>
          <Label htmlFor="title">Your story topics</Label>
          {/* <Select
            mode="multiple"
            placeholder="Inserted are removed"
            value={selectedItems}
            onChange={setSelectedItems}
            style={{ width: "100%" }}
            options={filteredOptions.map((item) => ({
              value: item,
              label: item,
            }))}
          /> */}
        </FlexColumn>
      </GridRow>
      <TextEditor></TextEditor>
    </NewStoryMainWrapper>
  );
};

export default NewStoryMain;
