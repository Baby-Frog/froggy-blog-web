import { Link } from "react-router-dom";
import { TStory } from "src/types/story.types";
import { getCustomDate } from "src/utils/formatDate";

type THomepageRecentPostProps = {
  story: TStory;
};

const HomepageRecentPost = ({ story }: THomepageRecentPostProps) => {
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
        <span className="flex items-center gap-2">
          <span>{getCustomDate(new Date(story.publishDate))}</span>
          <span>•</span>
          <span>{story.timeRead} read</span>
        </span>
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
