import React from "react";

type THomepageRecentPostProps = {
  something: string;
};

const HomepageRecentPost = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <img
            src="https://images.unsplash.com/photo-1691413436815-be2465a5db0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
            alt="Avatar"
            className="rounded-full w-6 h-6 object-cover"
          />
          <div className="text-xs font-bold">
            <span>Kelli Huggins</span>
            <span className="font-medium"> in</span>
            <span> The Belladonna Comedy</span>
          </div>
        </div>
        <h3 className="text-xl font-bold tracking-tighter">
          The Weird Sister’s Guide for How Not to Officiate Your Brother’s Wedding
        </h3>
        <p className="text-lightGrey text-[16px] font-medium">
          Here’s a handy list of “don’ts” I’ve learned from personal experience.
        </p>
        <span className="flex items-center gap-2">
          <span>Sep 29</span>
          <span>.</span>
          <span>Comedy</span>
        </span>
      </div>
      <div className="max-w-[200px] w-full h-full">
        <img
          src="https://miro.medium.com/v2/resize:fill:400:268/1*NxRsWiaK6QTV4-3md-8wTg.jpeg"
          alt=""
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default HomepageRecentPost;
