import { Link } from "react-router-dom";
import HandledImage from "src/components/HandledImage";
import { TStory } from "src/types/story.types";
import { getCustomDate } from "src/utils/formatDate";
import { generateSlug } from "src/utils/slugify";

type THomepageTrendingPostProps = {
  story: TStory;
};

const HomepageTrendingPost = ({ story }: THomepageTrendingPostProps) => {
  return (
    <Link
      to={`/${generateSlug({ name: story.title, id: story.id })}`}
      className="flex flex-col gap-2"
    >
      <div className="flex items-center gap-x-3">
        <HandledImage
          src={story.author.avatarPath}
          alt="Avatar"
          className="rounded-full w-6 h-6 object-cover"
        />
        <div className="font-bold tracking-tighter text-sm">{story.author.fullName}</div>
      </div>
      <h3 className="font-bold text-[16px] tracking-tighter">{story.title}</h3>
      <div className="flex items-center gap-x-3">
        <span className="font-light text-xs">{getCustomDate(new Date(story.publishDate))}</span>
        <span className="text-xs text-normalGrey">•</span>
        <span className="font-light text-xs">{story.timeRead} read</span>
      </div>
    </Link>
  );
};

export default HomepageTrendingPost;
