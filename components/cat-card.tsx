import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";

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
                    alt="user profile image"
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
        </Card>
    );
};
