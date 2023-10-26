import { useContext } from "react";
import { Link } from "react-router-dom";
import SaveToFavoritesIcon from "src/components/Icon/SaveToFavoritesIcon";
import Popover from "src/components/Popover";
import { AuthContext } from "src/contexts/auth.contexts";
import { TStory } from "src/types/story.types";
import { getCustomDate } from "src/utils/formatDate";
import { generateSlug } from "src/utils/slugify";

type TMoreFromAuthorSectionProps = {
  storiesLength?: number;
  currentAuthorStories: TStory[];
  story: TStory;
};

const MoreFromAuthorSection = ({ storiesLength, story, currentAuthorStories }: TMoreFromAuthorSectionProps) => {
  const { isAuthenticated } = useContext(AuthContext);
  if (storiesLength === 0) {
    return <></>;
  }
  if (storiesLength === 1) {
    return (
      <Link
        to={`/${generateSlug({ name: currentAuthorStories[0]?.title, id: currentAuthorStories[0]?.id })}`}
        className="mt-4"
      >
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
              <p className="mt-2 text-sm font-medium line-clamp-4 text-lightGrey">{currentAuthorStories[0].raw}</p>
              <div className="flex items-center justify-between">
                <span className="mt-2 flex items-center gap-2">
                  <span>{getCustomDate(new Date(story.publishDate))}</span>
                  <span>•</span>
                  <span>{story.timeRead} read</span>
                </span>
                {isAuthenticated ? (
                  <Popover
                    backgroundColor="#000000a8"
                    sameWidthWithChildren={false}
                    placement="top"
                    offsetPx={5}
                    renderPopover={<div className="text-white p-1">Add to Saved List</div>}
                  >
                    <SaveToFavoritesIcon
                      color="#6b6b6b"
                      width={24}
                      height={24}
                      className="cursor-pointer hover:text-softBlack"
                    ></SaveToFavoritesIcon>
                  </Popover>
                ) : (
                  <Popover
                    backgroundColor="#000000a8"
                    sameWidthWithChildren={false}
                    placement="top"
                    offsetPx={5}
                    renderPopover={<div className="text-white p-1">You must login to save this story</div>}
                  >
                    <SaveToFavoritesIcon
                      color="#bdbdbd"
                      width={24}
                      height={24}
                      className="cursor-default"
                    ></SaveToFavoritesIcon>
                  </Popover>
                )}
              </div>
            </>
          )}
        </>
      </Link>
    );
  }
  if (storiesLength === 2) {
    return (
      <div className="mt-4">
        <>
          {currentAuthorStories && (
            <div className="grid grid-cols-2 gap-4">
              {currentAuthorStories.map((story) => (
                <Link to={`/${generateSlug({ name: story.title, id: story.id })}`}>
                  <div className="w-full h-52">
                    <img
                      src={story.thumbnail}
                      alt={story.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold">
                    <span className="rounded-full w-5 h-5 overflow-hidden">
                      <img
                        src={story.author.avatarPath}
                        alt={story.author.fullName}
                        className="w-full h-full object-cover"
                      />
                    </span>
                    <div className="flex items-center gap-1">
                      <span>{story.author.fullName}</span>
                      <span className="font-medium"> in</span>
                      <span> Froggy Blog</span>
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="text-2xl font-bold tracking-tight">{story.title}</div>
                    <p className="mt-2 text-sm font-medium line-clamp-3 text-lightGrey">{story.raw}</p>
                    <span className="mt-2 flex items-center gap-2">
                      <span>{getCustomDate(new Date(story.publishDate))}</span>
                      <span>•</span>
                      <span>{story.timeRead} read</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      </div>
    );
  }
  if (storiesLength === 3) {
    return (
      <div className="flex flex-col gap-4 mt-4">
        {currentAuthorStories && (
          <>
            <div className="grid grid-cols-2 gap-4">
              {currentAuthorStories.slice(0, 2).map((story) => (
                <div>
                  <div className="w-full h-52">
                    <img
                      src={story.thumbnail}
                      alt={story.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold">
                    <span className="rounded-full w-5 h-5 overflow-hidden">
                      <img
                        src={story.author.avatarPath}
                        alt={story.author.fullName}
                        className="w-full h-full object-cover"
                      />
                    </span>
                    <div className="flex items-center gap-1">
                      <span>{story.author.fullName}</span>
                      <span className="font-medium"> in</span>
                      <span> Froggy Blog</span>
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="text-2xl font-bold tracking-tight">{story.title}</div>
                    <p className="mt-2 text-sm font-medium line-clamp-3 text-lightGrey">{story.raw}</p>
                    <span className="mt-2 flex items-center gap-2">
                      <span>{getCustomDate(new Date(story.publishDate))}</span>
                      <span>•</span>
                      <span>{story.timeRead} read</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <>
                {currentAuthorStories && (
                  <>
                    <div className="w-full h-72">
                      <img
                        src={currentAuthorStories[2].thumbnail}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm font-semibold">
                      <span className="rounded-full w-5 h-5 overflow-hidden">
                        <img
                          src={currentAuthorStories[2].author.avatarPath}
                          alt={currentAuthorStories[2].author.fullName}
                          className="w-full h-full object-cover"
                        />
                      </span>
                      <div className="flex items-center gap-1">
                        <span>{currentAuthorStories[2].author.fullName}</span>
                        <span className="font-medium"> in</span>
                        <span> Froggy Blog</span>
                      </div>
                    </div>
                    <div className="mt-2 text-xl font-semibold">{currentAuthorStories[2].title}</div>
                    <p className="mt-2 text-sm font-medium line-clamp-4 text-lightGrey">
                      {currentAuthorStories[2].raw}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="mt-2 flex items-center gap-2">
                        <span>{getCustomDate(new Date(story.publishDate))}</span>
                        <span>•</span>
                        <span>{story.timeRead} read</span>
                      </span>
                    </div>
                  </>
                )}
              </>
            </div>
          </>
        )}
      </div>
    );
  }
};

export default MoreFromAuthorSection;
