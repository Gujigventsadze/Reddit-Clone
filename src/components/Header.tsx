import glassImg from "../../public/magnifying-glass.png";
import Image from "next/image";
import Hamburgermenu from "./Hamburgermenu";
import ProfileComponent from "./ProfileComponent";
import Link from "next/link";
import paths from "@/paths";

const Header = () => {
  return (
    <nav className="flex justify-between box-border py-4 px-3 font-titleFont bg-black text-white items-center">
      <Hamburgermenu />
      <Link
        href={paths.home()}
        className="text-2xl font-bold flex-1 hidden sm:block"
      >
        RedditClone
      </Link>
      <ul className="hidden lg:flex lg:flex-1 lg:justify-start lg:space-x-12 lg:text-[1.3rem]">
        <Link href={paths.home()} className="cursor-pointer hover:opacity-75">
          Home
        </Link>
        <Link
          href={paths.aboutPage()}
          className="cursor-pointer hover:opacity-75"
        >
          About
        </Link>
        <Link
          href={paths.contactPage()}
          className="cursor-pointer hover:opacity-75"
        >
          Contact
        </Link>
      </ul>
      <div className="flex flex-1 justify-end gap-2 w-[70%] items-center">
        <div className="relative">
          <input
            placeholder="Search"
            className="box-border py-2 px-8 rounded-xl outline-none text-black font-titleFont w-full"
          />
          <Image
            src={glassImg}
            alt="Search Button"
            className="w-[20px] absolute top-[25%] right-2 cursor-pointer hover:opacity-80"
          />
        </div>
        <ProfileComponent />
      </div>
    </nav>
  );
};

export default Header;
