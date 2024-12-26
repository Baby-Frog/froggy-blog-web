import { toast } from "react-toastify";
import SuccessToastIcon from "src/components/Icon/ToastIcon/SuccessToastIcon";
export default function useShareLink({
  author,
  currentStoryUrl,
  title,
}: {
  title?: string;
  author?: string;
  currentStoryUrl?: string;
}) {
  const shareOnTwitter = ({ title, author, url }: { title: string; author: string; url: string }) => {
    url = currentStoryUrl as string;
    const text = `Check out the article ${title} by ${author} on Froggy Blog: %0A`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    return twitterUrl;
  };
  const handleCopyCurrentLink = (currentStoryUrl: string) => {
    navigator.clipboard.writeText(currentStoryUrl);
    toast.success("Copied link to clipboard", {
      icon: <SuccessToastIcon></SuccessToastIcon>,
    });
  };
  return {
    shareOnTwitter,
    handleCopyCurrentLink,
  };
}
