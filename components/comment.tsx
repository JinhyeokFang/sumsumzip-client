import { User } from "@/interfaces/user.interface";
import { User as NextUiUser } from "@nextui-org/user";

export interface CommentProps {
    content: string;
    user: User;
}

export const Comment = (props: CommentProps) => {
  const { content, user } = props;

  return (
    <NextUiUser
        name={ content }
        description={ user.name }
        avatarProps={{
            src: user.picture
        }}
    />
  );
}
