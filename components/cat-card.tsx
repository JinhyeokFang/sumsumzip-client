import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";
import { User } from "@nextui-org/user";
import { HeartButton } from "./heart-button";
import { useAuth } from "@/states/auth";
import { CatApi } from "@/app/api/cat.api";
import { ChangeEvent, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { useRouter } from "next/navigation";
import { UserApi } from "@/app/api/user.api";

export interface CatCardProps {
    profileImage: string;
    userName: string;
    catImage: string;
    title: string;
    description: string;
    like: boolean;
    catId: number;
    userId: number;
}

export const CatCard = (props: CatCardProps) => {
    const auth = useAuth();
    const [commentContent, setCommentContent] = useState('');
    const commentInputRef = useRef<HTMLInputElement>(null);
    const { push } = useRouter();
    const {
        profileImage,
        userName,
        catImage,
        title,
        description,
        like,
        catId,
        userId,
    } = props;

    const onUserClicked = async () => {
        push(`/user/${userId}`);
    }

    const onPressedChange = (pressed: boolean) => {
        if (auth.token === null) {
            throw new Error("로그인이 필요합니다.");
        }
        if (pressed) {
            CatApi.like(auth.token, catId);
        } else {
            CatApi.dislike(auth.token, catId);
        }
    }

    const onCommentInputChange = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        const value = target.value;
        setCommentContent(value);
    }

    const onCommentSubmitButtonClick = () => {
        if (auth.token === null) {
            throw new Error("로그인이 필요합니다.");
        }
        CatApi.addComment(auth.token, catId, commentContent);
        setCommentContent('');
        if (commentInputRef.current !== undefined) {
            const inputElement = commentInputRef.current as HTMLInputElement;
            inputElement.value = '';
        }
        push(`/cat/${catId}`);
    }

    return (
        <Card>
            <CardHeader className="flex gap-3">
                <User   
                    name={ title }
                    description={ userName }
                    avatarProps={{
                        src: profileImage
                    }}
                    onClick={onUserClicked}
                    className="cursor-pointer"
                />
            </CardHeader>
            <Divider/>
            <CardBody>
                <div className="flex justify-center">
                    <Image
                        alt="cat image"
                        src={ catImage }
                        className="max-w-[80vw] max-h-[40vh]"
                    />
                </div>
                <p>{ description }</p>
            </CardBody>
            <CardFooter className="p-6">
                <HeartButton 
                    initialPressed={like}
                    onPressedChange={onPressedChange}
                />
                <Input type="title" placeholder="댓글을 입력하세요" className="m-2" onChange={onCommentInputChange} ref={commentInputRef}/>
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
            </CardFooter>
        </Card>
    );
};
