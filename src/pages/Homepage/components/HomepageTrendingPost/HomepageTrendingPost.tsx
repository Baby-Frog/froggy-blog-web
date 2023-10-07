import React from "react";

type THomepageTrendingPostProps = {
  something: string;
};

const HomepageTrendingPost = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-x-3">
        <img
          src="https://images.unsplash.com/photo-1691413436815-be2465a5db0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
          alt="Avatar"
          className="rounded-full w-6 h-6 object-cover"
        />
        <div className="font-bold tracking-tighter text-sm">Joey Jonathan</div>
      </div>
      <h3 className="font-bold text-[16px] tracking-tighter">Mastering Customer Segmentation with LLM</h3>
      <div className="flex items-center gap-x-3">
        <span className="font-light text-xs">Sep 29</span>
        <span className="text-xs text-normalGrey">•</span>
        <span className="font-light text-xs">6 min read</span>
      </div>
    </div>
  );
};

export default HomepageTrendingPost;
