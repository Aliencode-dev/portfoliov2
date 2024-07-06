import React from "react";
interface CtaButtonProps {
  href: string;
  name: string;
  children: React.ReactNode;
}

const CtaButton: React.FC<CtaButtonProps> = ({ href, name, children }) => {
  return (
    <>
      <a
        href={href || "#"}
        className="flex flex-row justify-center items-center px-[20px] py-[14px] gap-[10px] w-full bg-white text-gray-900 rounded-lg cursor-pointer hover:bg-gray-100"
      >
        <h3 className="w-full text-[16px] font-medium text-left">{name}</h3>
        {children}
      </a>
    </>
  );
};

export default CtaButton;
