import { Link } from "react-router-dom";
import CopyIcon from "src/components/Icon/CopyIcon";
import { toast } from "react-toastify";
import SaveToFavoritesIcon from "src/components/Icon/SaveToFavoritesIcon";
import ShareStoryIcon from "src/components/Icon/ShareStoryIcon";
import TwitterIcon from "src/components/Icon/SocialIcon/TwitterIcon";
import Popover from "src/components/Popover";
import PopoverDismiss from "src/components/PopoverDismiss";
import { TStory } from "src/types/story.types";
import { getCustomDate } from "src/utils/formatDate";
import SuccessToastIcon from "src/components/Icon/ToastIcon/SuccessToastIcon";

type THomepageRecentPostProps = {
  story: TStory;
};

const HomepageRecentPost = ({ story }: THomepageRecentPostProps) => {
  const currentStoryUrl = `${window.location.href}${story.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentStoryUrl);
    toast.success("Copied link to clipboard", {
      icon: <SuccessToastIcon></SuccessToastIcon>,
    });
  };
  return (
    <Link
      to={`/${story.id}`}
      className="flex items-center gap-2"
    >
      <div className="flex flex-col gap-2">
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
        <p className="text-lightGrey text-[16px] font-medium line-clamp-3">{story.raw}</p>
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
            <Popover
              backgroundColor="#000000a8"
              sameWidthWithChildren={false}
              placement="top"
              offsetPx={5}
              renderPopover={<div className="text-white p-1">Save to favorites</div>}
            >
              <SaveToFavoritesIcon
                color="#6b6b6b"
                width={24}
                height={24}
                className="cursor-pointer hover:text-softBlack"
                aria-hidden
              ></SaveToFavoritesIcon>
            </Popover>
            <PopoverDismiss
              sameWidthWithChildren={false}
              placement="bottom"
              renderPopover={
                <div className="shadow-niceShadowSpread">
                  <div
                    className="p-2 text-normalGrey  hover:bg-black hover:bg-opacity-10 cursor-pointer flex items-center gap-2"
                    onClick={handleCopyLink}
                    aria-hidden
                  >
                    <CopyIcon color="#6b6b6b"></CopyIcon>
                    <span>Copy link</span>
                  </div>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${story?.title}%20by%20${story.author.fullName}&url=${currentStoryUrl}`}
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
      <div className="max-w-[200px] w-full h-full rounded-md overflow-hidden flex-shrink-0">
        <img
          src={story.thumbnail}
          alt=""
          className="w-full h-full rounded-md object-cover"
        />
      </div>
    </Link>
  );
};

export default HomepageRecentPost;
