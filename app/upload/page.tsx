'use client'
import React, { useRef, useState } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";

export default function MyPage() {
	const [previewImage, setPreviewImage] = useState('');
	const hiddenFileInput = useRef<HTMLInputElement>(null);
	const setImage = (fileBlob: any) => {
		const reader = new FileReader();
		reader.readAsDataURL(fileBlob);
		reader.onload = () => setPreviewImage(reader.result as string);
	};

	const handleClick = () => {
		if (hiddenFileInput.current !== null)
			hiddenFileInput.current.click();
	};

	const handleChange = (event: React.ChangeEvent) => {
		const target = event.target as HTMLInputElement;
		const fileList = target.files as FileList;
		const file = fileList[0];
		setImage(file);
	};

	return (
		<section className="flex flex-col items-center justify-center gap-4">
			<Card className="w-[400px]">
				<CardHeader className="flex gap-3">
					<Input type="title" label="제목" placeholder="제목을 입력하세요" />
				</CardHeader>
				<Divider/>
				<CardBody>
					{
						previewImage 
							? <Image src={previewImage} alt="미리보기 사진"/>
							: <p className="text-center">이미지를 올려주세요</p>
					}
					<Button onClick={handleClick} color="primary" className="my-4">
						이미지 첨부하기
					</Button>
					<input
						type="file"
						ref={hiddenFileInput}
						onChange={handleChange}
						style={{display: 'none'}} 
					/>
					<Textarea
						label="내용"
						labelPlacement="outside"
						placeholder="내용을 입력하세요"
					/>
				</CardBody>
				<Divider/>
				<CardFooter className="flex justify-center">
					<Button color="primary">
						공유하기
					</Button>
				</CardFooter>
				</Card>
		</section>
	);
}
