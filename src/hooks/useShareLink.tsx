import SuccessToastIcon from "src/components/Icon/ToastIcon/SuccessToastIcon";
import { toast } from "react-toastify";
export default function useShareLink(title?: string, author?: string, currentStoryUrl?: string) {
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
