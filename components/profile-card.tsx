import { User } from "@/interfaces/user.interface";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { User as NextUiUser } from "@nextui-org/user";
import { useState } from "react";

export interface ProfileCardProps {
    user: User;
    initialFollow: boolean;
    onFollowChange: (follow: boolean) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const { initialFollow, user, onFollowChange } = props;
  const [follow, setFollow] = useState(initialFollow);
    console.log(user);
  const onFollowButtonClick = () => {
    setFollow(!follow);
    onFollowChange(!follow);
  }

  return (
    <Card className="w-full p-4">
        <div className="flex justify-between items-center">
            <NextUiUser
                name={ user.name }
                avatarProps={{
                    src: user.picture
                }}
            />
            <div className="flex justify-between gap-2">
                <p className="text-xs">팔로어: { user.followers.length } 명</p>
                <p className="text-xs">팔로우: { user.following.length } 명</p>
            </div>
            <Button color={follow ? "default" : "primary"} onClick={onFollowButtonClick}>
                {
                    follow
                        ? "언팔로우"
                        : "팔로우"
                }
            </Button>
        </div>
    </Card>
  );
}
