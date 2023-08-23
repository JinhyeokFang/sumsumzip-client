import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";
import { User } from "@nextui-org/user";
import { HeartButton } from "./heart-button";
import { useAuth } from "@/states/auth";
import { CatApi } from "@/app/api/cat.api";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { useRouter } from "next/navigation";
import { Constants } from "@/config/constants";
import { Cat } from "@/interfaces/cat.interface";
import { useDisclosure } from "@nextui-org/modal";
import { DeleteModal } from "./delete-modal";

export interface CatCardProps {
    cat: Cat;
}

export const CatCard = (props: CatCardProps) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const auth = useAuth();
    const [commentContent, setCommentContent] = useState('');
    const commentInputRef = useRef<HTMLInputElement>(null);
    const { push } = useRouter();
    const {
        cat,
    } = props;
    
    const onDelete = () => {
        if (auth.token === null) {
            throw new Error("로그인이 필요합니다.");
        }
        CatApi.deleteCat(auth.token, cat.id);
        push('/');
    }

    const onUserClicked = async () => {
        push(`/user/${cat.user.id}`);
    }

    const onPressedChange = (pressed: boolean) => {
        if (auth.token === null) {
            push(Constants.serverAddress + '/oauth2/authorization/google');
            return;
        }
        if (pressed) {
            CatApi.like(auth.token, cat.id);
        } else {
            CatApi.dislike(auth.token, cat.id);
        }
    }

    const onCardBodyClick = () => {
        push(`/cat/${cat.id}`);
    }

    const onCommentInputChange = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        setCommentContent(value);
    }

    const onInputKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            onCommentSubmitButtonClick();
        }
    }

    const onCommentSubmitButtonClick = () => {
        if (auth.token === null) {
            throw new Error("로그인이 필요합니다.");
        }
        CatApi.addComment(auth.token, cat.id, commentContent);
        setCommentContent('');
        if (commentInputRef.current !== undefined) {
            const inputElement = commentInputRef.current as HTMLInputElement;
            inputElement.value = '';
        }
        push(`/cat/${cat.id}`);
    }

    return (
        <DeleteModal
            title="게시물 삭제"
            description="게시물을 삭제하시겠습니까?"
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            onDelete={onDelete}
            onCancel={() => {}}
        >
            <Card className="w-full">
                <CardHeader className="flex justify-between select-none px-5">
                    <User   
                        name={ cat.title }
                        description={ cat.user.name }
                        avatarProps={{
                            src: cat.user.picture
                        }}
                        onClick={onUserClicked}
                        className="cursor-pointer"
                    />
                    {
                        cat.user.email === auth.email &&
                        <span className="text-xs cursor-pointer" onClick={onOpen}>
                            삭제
                        </span> 
                    }
                </CardHeader>
                <Divider/>
                <CardBody className="cursor-pointer" onClick={onCardBodyClick}>
                    <div className="flex justify-center">
                        <Image
                            alt="cat image"
                            src={ cat.url }
                            className="max-w-full max-h-[40vh]"
                        />
                    </div>
                    <p>{ cat.description }</p>
                </CardBody>
                <CardFooter className="p-6">
                    <HeartButton 
                        numberOfHearts={ cat.likeList.length }
                        initialPressed={ cat.likeList.findIndex(user => user.email === auth.email) !== -1 }
                        onPressedChange={onPressedChange}
                        disable={auth.token === null}
                    />
                    {
                        auth.token && (
                            <>
                                <Input type="title" placeholder="댓글을 입력하세요" className="m-2 select-none" onChange={onCommentInputChange} onKeyDown={onInputKeyDown} ref={commentInputRef}/>
                                <Popover placement="top">
                                    <PopoverTrigger>
                                        <Button color="primary" onClick={onCommentSubmitButtonClick}>
                                            작성
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div className="px-1 py-2">
                                            <div className="text-small">댓글을 추가했습니다!</div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </>
                        )
                    }
                </CardFooter>
            </Card>
        </DeleteModal>
    );
};
