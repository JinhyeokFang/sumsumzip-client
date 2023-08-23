import { User } from "@/interfaces/user.interface";
import { useAuth } from "@/states/auth";
import { User as NextUiUser } from "@nextui-org/user";
import { DeleteModal } from "./delete-modal";
import { useDisclosure } from "@nextui-org/modal";
import { Comment } from "@/interfaces/comment.interface";
import { CatApi } from "@/app/api/cat.api";

export interface CommentProps {
    comment: Comment;
    user: User;
}

export const CommentCard = (props: CommentProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const auth = useAuth();
  const { comment, user } = props;

  const onDelete = () => {
    if (auth.token === null) {
        throw new Error("로그인이 필요합니다.");
    }
    CatApi.deleteComment(auth.token, comment.id);
    window.location.reload();
  }

  return (
    <DeleteModal
      title="댓글 삭제"
      description="댓글을 삭제하시겠습니까?"
      isOpen={isOpen}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      onDelete={onDelete}
      onCancel={() => {}}
    >
      <div className="flex w-full justify-between items-center">
        <NextUiUser
            name={ comment.content }
            description={ user.name }
            avatarProps={{
                src: user.picture
            }}
        />
        {
          auth.email === user.email &&  
          <p className="text-xs cursor-pointer" onClick={onOpen}>
            삭제
          </p>
        }
      </div>
    </DeleteModal>
  );
}
