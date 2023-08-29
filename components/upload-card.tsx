import { ChangeEvent, useRef, useState } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { CatApi } from "../app/api/cat.api";
import { useAuth } from "@/states/auth";

export const Upload = () => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [rawImage, setRawImage] = useState<File | null>(null);
	const [previewImage, setPreviewImage] = useState('');
	const hiddenFileInput = useRef<HTMLInputElement>(null);
	const auth = useAuth();

	const titleChange = (event: ChangeEvent) => {
		const target = event.target as HTMLInputElement;
		setTitle(target.value);
	}

	const imageButtonClick = () => {
		if (hiddenFileInput.current !== null)
			hiddenFileInput.current.click();
	};

	const imageInputChange = (event: ChangeEvent) => {
		const target = event.target as HTMLInputElement;
		const fileList = target.files as FileList;
		const file = fileList[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => setPreviewImage(reader.result as string);
		setRawImage(file);
	};

	const descriptionChange = (event: ChangeEvent) => {
		const target = event.target as HTMLInputElement;
		setDescription(target.value);
	}

	const back = () => {
		window.history.back();
	}

	const submit = () => {
		if (!auth.token) {
			alert("로그인이 필요합니다.");
			return;
		}

		if (title === "") {
			alert("제목을 입력해주세요.");
			return;
		}
		if (description === "") {
			alert("내용을 입력해주세요.");
			return;
		}
		if (rawImage === null) {
			alert("이미지를 첨부해주세요.");
			return;
		}
		CatApi.uploadCat(auth.token, title, description, rawImage);
		back();
	}

	return (
		<Card className="w-full">
			<CardHeader className="flex gap-3">
				<Input type="title" label="제목" placeholder="제목을 입력하세요" onChange={titleChange}/>
			</CardHeader>
			<Divider/>
			<CardBody>
				{
					previewImage 
						? <Image src={previewImage} alt="미리보기 사진"/>
						: <p className="text-center">이미지를 올려주세요</p>
				}
				<Button onClick={imageButtonClick} color="primary" className="my-4">
					이미지 첨부하기
				</Button>
				<input
					type="file"
					ref={hiddenFileInput}
					onChange={imageInputChange}
					style={{display: 'none'}} 
				/>
				<Textarea
					label="내용"
					labelPlacement="outside"
					placeholder="내용을 입력하세요"
					onChange={descriptionChange}
				/>
			</CardBody>
			<Divider/>
			<CardFooter className="flex justify-center">
				<Button color="primary" onClick={submit}>
					공유하기
				</Button>
			</CardFooter>
		</Card>
	);
}
