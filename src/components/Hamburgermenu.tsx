"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";

const Hamburgermenu = () => {
  return (
    <div className="lg:hidden">
      <Popover placement="bottom">
        <PopoverTrigger>
          <div className="mr-3 flex flex-col gap-[6px] cursor-pointer bg-white/15 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-none rounded-[10px] border border-white/18 p-2">
            <div className="w-[30px] h-[2px] bg-white"></div>
            <div className="w-[30px] h-[2px] bg-white"></div>
            <div className="w-[30px] h-[2px] bg-white"></div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="px-6 py-2 text-xl flex flex-col gap-3 bg-black text-white">
          <div>Home</div>
          <div>About</div>
          <div>Contact</div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Hamburgermenu;
