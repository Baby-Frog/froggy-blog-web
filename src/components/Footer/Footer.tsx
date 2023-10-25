type TFooterProps = {
  className?: string;
};

const Footer = ({ className }: TFooterProps) => {
  return (
    <div className={className}>
      <footer className="bg-[#f9f9f9] py-3 border-t-[1px] flex items-center justify-center border-t-[#E5E5E5]">
        <div className="max-w-[680px] w-full flex items-center gap-4">
          <span className="text-lightGrey text-[13px] leading-5">Help</span>
          <span className="text-lightGrey text-[13px] leading-5">Status</span>
          <span className="text-lightGrey text-[13px] leading-5">About</span>
          <span className="text-lightGrey text-[13px] leading-5">Careers</span>
          <span className="text-lightGrey text-[13px] leading-5">Blog</span>
          <span className="text-lightGrey text-[13px] leading-5">Privacy</span>
          <span className="text-lightGrey text-[13px] leading-5">Terms</span>
          <span className="text-lightGrey text-[13px] leading-5">Teams</span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
