import { Link } from "react-router-dom";
import CopyIcon from "src/components/Icon/CopyIcon";
import { toast } from "react-toastify";
import { useContext, useMemo } from "react";
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
import { useMutation, useQuery, useQueryClient } from "react-query";
import { storyApi } from "src/apis/story.apis";
import { AuthContext } from "src/contexts/auth.contexts";
import RemoveIcon from "src/components/Icon/RemoveIcon";
import SuccessToastIcon from "src/components/Icon/ToastIcon/SuccessToastIcon";
import { displayAlternativeImage } from "src/utils/displayAlternativeImage";
import HandledImage from "src/components/HandledImage";
type THomepageRecentPostProps = {
  story: TStory;
};

const HomepageRecentPost = ({ story }: THomepageRecentPostProps) => {
  const currentStoryUrl = `${window.location.origin}/${generateSlug({ name: story.title, id: story.id })}`;
  const queryClient = useQueryClient();
  const { isAuthenticated } = useContext(AuthContext);
  const { handleCopyCurrentLink, shareOnTwitter } = useShareLink({
    author: story.author.fullName,
    title: story.title,
    currentStoryUrl,
  });
  {
    const { data } = useQuery({
      queryKey: ["savedStories"],
      queryFn: () => storyApi.getFavoriteStories(),
    });
    const saveToFavoritesMutation = useMutation({
      mutationFn: storyApi.saveStoryToFavorites,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["savedStories"] });
      },
    });
    const isUserProfilePage = useMemo(() => {
      return window.location.pathname.includes("/user/profile");
    }, []);
    const savedStories = data?.data.data.data;

    const handleSaveToFavorites = (storyId: string) => {
      saveToFavoritesMutation.mutate(storyId, {
        onSuccess: (data) => {
          toast.dismiss();
          toast.success(data.data.message, {
            icon: <SuccessToastIcon></SuccessToastIcon>,
          });
        },
      });
    };
    return (
      <Link
        to={`/${generateSlug({ name: story.title, id: story.id })}`}
        className="flex items-center gap-2 justify-between"
      >
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center gap-2">
            <HandledImage
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
              <span>
                {story.timeRead}
                read
              </span>
            </span>
            <div
              className="flex items-center gap-2"
              onClick={(e) => e.preventDefault()}
              aria-hidden
            >
              {!isUserProfilePage && (
                <>
                  {isAuthenticated && !savedStories?.find((savedStory) => savedStory.id === story.id) ? (
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
                        onClick={() => handleSaveToFavorites(story.id)}
                        aria-hidden
                      ></SaveToFavoritesIcon>
                    </Popover>
                  ) : !isAuthenticated ? (
                    <Popover
                      backgroundColor="#000000a8"
                      sameWidthWithChildren={false}
                      placement="top"
                      offsetPx={5}
                      renderPopover={<div className="text-white p-1">You must login to save this story</div>}
                    >
                      <SaveToFavoritesIcon
                        color="#6b6b6b"
                        width={24}
                        height={24}
                        className="cursor-pointer hover:text-softBlack"
                        aria-hidden
                      ></SaveToFavoritesIcon>
                    </Popover>
                  ) : (
                    <RemoveIcon
                      color="#6b6b6b"
                      width={24}
                      height={24}
                      className="cursor-pointer hover:text-softBlack"
                      onClick={() => handleSaveToFavorites(story.id)}
                    ></RemoveIcon>
                  )}
                </>
              )}
              {isUserProfilePage && (
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
              )}
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
          <HandledImage
            src={story.thumbnail}
            alt=""
            className="w-full h-full rounded-md object-cover"
          />
        </div>
      </Link>
    );
  }
};
export default HomepageRecentPost;
