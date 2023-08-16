import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";

export interface CatCardProps {
    profileImage: string;
    userId: string;
    catImage: string;
    title: string;
    description: string;
}

export const CatCard = (props: CatCardProps) => {
    const {
        profileImage,
        userId,
        catImage,
        title,
        description
    } = props;

    return (
        <Card>
            <CardHeader className="flex gap-3">
                <Image
                    alt="프로필 사진"
                    height={40}
                    radius="sm"
                    src={ profileImage }
                    width={40}
                />
                <div className="flex flex-col">
                    <p className="text-md">{ title }</p>
                </div>
            </CardHeader>
            <Divider/>
            <CardBody>
                <Image
                    alt="cat image"
                    src={ catImage }
                />
                <p>{ description }</p>
            </CardBody>
            <CardFooter className="p-4">
                <Input type="title" placeholder="댓글을 입력하세요" className="mr-2" />
                <Button color="primary">
                    작성
                </Button>
            </CardFooter>
        </Card>
    );
};
