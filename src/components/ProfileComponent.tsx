"use client";
import {
  Avatar,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "@/actions";
const ProfileComponent = () => {
  const session = useSession();
  let profileContent = null;

  if (session.status === "loading") {
    profileContent = null;
  } else if (session.data?.user) {
    profileContent = (
      <Popover placement="bottom">
        <PopoverTrigger>
          <Avatar
            src={session.data.user.image || ""}
            className="cursor-pointer"
          />
        </PopoverTrigger>
        <PopoverContent className="box-border p-6">
          <form action={signOut}>
            <Button type="submit" color="danger">
              Log Out
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    );
  } else {
    profileContent = (
      <form action={signIn}>
        <Button type="submit" color="primary">
          Sign In
        </Button>
      </form>
    );
  }

  return <>{profileContent}</>;
};

export default ProfileComponent;
