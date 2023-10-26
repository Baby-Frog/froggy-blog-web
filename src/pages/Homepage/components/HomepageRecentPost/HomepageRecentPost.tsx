import { Link } from "react-router-dom";
import CopyIcon from "src/components/Icon/CopyIcon";
import SaveToFavoritesIcon from "src/components/Icon/SaveToFavoritesIcon";
import ShareStoryIcon from "src/components/Icon/ShareStoryIcon";
import TwitterIcon from "src/components/Icon/SocialIcon/TwitterIcon";
import Popover from "src/components/Popover";
import PopoverDismiss from "src/components/PopoverDismiss";
import { TStory } from "src/types/story.types";
import { getCustomDate } from "src/utils/formatDate";
import DefaultErrorImage from "src/assets/no-img-avaliable.png";
import { generateSlug } from "src/utils/slugify";
import useShareLink from "src/hooks/useShareLink";
import EllipsisIcon from "src/components/Icon/EllipsisIcon";
type THomepageRecentPostProps = {
  story: TStory;
};

const HomepageRecentPost = ({ story }: THomepageRecentPostProps) => {
  const currentStoryUrl = `${window.location.origin}/${generateSlug({ name: story.title, id: story.id })}`;
  const { handleCopyCurrentLink, shareOnTwitter } = useShareLink({
    author: story.author.fullName,
    title: story.title,
    currentStoryUrl,
  });

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (e.currentTarget.src !== DefaultErrorImage) {
      e.currentTarget.src = DefaultErrorImage;
    }
  };
  return (
    <Link
      to={`/${generateSlug({ name: story.title, id: story.id })}`}
      className="flex items-center gap-2 justify-between"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2">
          <img
            src={story.author.avatarPath}
            alt="Avatar"
            className="rounded-full w-6 h-6 object-cover"
          />
          <div className="text-xs font-bold">
            <span>{story.author.fullName}</span>
            <span className="font-medium"> in</span>
            <span> Froggy Blog</span>
          </div>
        </div>
        <h3 className="text-xl font-bold tracking-tighter">{story.title}</h3>
        <p className="text-lightGrey text-sm font-medium line-clamp-3">{story.raw}</p>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>{getCustomDate(new Date(story.publishDate))}</span>
            <span>•</span>
            <span>{story.timeRead} read</span>
          </span>
          <div
            className="flex items-center gap-2"
            onClick={(e) => e.preventDefault()}
            aria-hidden
          >
            <PopoverDismiss
              className="text-sm z-10 text-lightGrey"
              as="button"
              enableArrow={false}
              placement="bottom-end"
              sameWidthWithChildren={false}
              renderPopover={
                <div className="w-max text-left font-medium z-10 bg-white shadow-softShadowSpread text-black">
                  <Link
                    to={`/edit-story/${generateSlug({ name: story.title, id: story.id })}`}
                    className="p-2 text-normalGrey block hover:bg-black hover:bg-opacity-10 cursor-pointer"
                  >
                    Edit story
                  </Link>
                  <div
                    className="p-2 text-failure font-medium hover:bg-black hover:bg-opacity-10 cursor-pointer"
                    aria-hidden
                  >
                    Delete story
                  </div>
                </div>
              }
            >
              <EllipsisIcon
                width={24}
                height={24}
              ></EllipsisIcon>
            </PopoverDismiss>
            <PopoverDismiss
              sameWidthWithChildren={false}
              placement="bottom"
              renderPopover={
                <div className="shadow-niceShadowSpread">
                  <div
                    className="p-2 text-normalGrey hover:bg-black hover:bg-opacity-10 cursor-pointer flex items-center gap-2"
                    onClick={() => handleCopyCurrentLink(currentStoryUrl)}
                    aria-hidden
                  >
                    <CopyIcon color="#6b6b6b"></CopyIcon>
                    <span>Copy link</span>
                  </div>
                  <a
                    href={shareOnTwitter({ title: story.title, author: story.author.fullName, url: currentStoryUrl })}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 text-normalGrey  hover:bg-black hover:bg-opacity-10 cursor-pointer flex items-center gap-2"
                  >
                    <TwitterIcon color="#6b6b6b"></TwitterIcon>
                    <span>Share on Twitter</span>
                  </a>
                </div>
              }
            >
              <ShareStoryIcon
                color="#6b6b6b"
                width={24}
                height={24}
                className="cursor-pointer hover:text-softBlack"
              ></ShareStoryIcon>
            </PopoverDismiss>
          </div>
        </div>
      </div>
      <div className="max-w-[200px] w-full h-[200px] rounded-md overflow-hidden flex-shrink-0">
        <img
          src={story.thumbnail}
          alt=""
          onError={handleImageError}
          className="w-full h-full rounded-md object-cover"
        />
      </div>
    </Link>
  );
};

export default HomepageRecentPost;
