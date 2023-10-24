import { TStory } from "src/types/story.types";

type TMoreFromAuthorSectionProps = {
  storiesLength?: number;
  currentAuthorStories: TStory[];
  story: TStory;
};

const MoreFromAuthorSection = ({ storiesLength, story, currentAuthorStories }: TMoreFromAuthorSectionProps) => {
  console.log(story);
  if (storiesLength === 0) {
    return <></>;
  }
  if (storiesLength === 2) {
    return (
      <div className="mt-4">
        <>
          {currentAuthorStories && (
            <>
              <div className="w-full h-72">
                <img
                  src={currentAuthorStories[0].thumbnail}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm font-semibold">
                <span className="rounded-full w-5 h-5 overflow-hidden">
                  <img
                    src={currentAuthorStories[0].author.avatarPath}
                    alt={currentAuthorStories[0].author.fullName}
                    className="w-full h-full object-cover"
                  />
                </span>
                <div className="flex items-center gap-1">
                  <span>{currentAuthorStories[0].author.fullName}</span>
                  <span className="font-medium"> in</span>
                  <span> Froggy Blog</span>
                </div>
              </div>
              <div className="mt-2 text-xl font-semibold">{currentAuthorStories[0].title}</div>
              <p className="mt-2 text-sm font-medium line-clamp-3 text-lightGrey">{currentAuthorStories[0].raw}</p>
            </>
          )}
        </>
      </div>
    );
  }
  return <div></div>;
};

export default MoreFromAuthorSection;
