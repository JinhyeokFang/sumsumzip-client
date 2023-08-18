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

  const onFollowButtonClick = () => {
    setFollow(!follow);
    onFollowChange(!follow);
  }

  return (
    <Card className="w-full p-4">
        <div className="flex justify-between">
            <NextUiUser
                name={ user.name }
                avatarProps={{
                    src: user.picture
                }}
            />
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
