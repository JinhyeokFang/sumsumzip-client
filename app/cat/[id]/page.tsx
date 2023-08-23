'use client'
import { CatCard } from "@/components/cat-card";
import { useEffect, useState } from "react";
import { CatApi } from "@/app/api/cat.api";
import { useParams } from "next/navigation";
import { Button } from "@nextui-org/button";
import { useAuth } from "@/states/auth";
import { Cat } from "@/interfaces/cat.interface";
import { CommentCard } from "@/components/comment";

export default function CatPage() {
	const auth = useAuth();
	const [cat, setCat] = useState<Cat>();
	const id = useParams().id;
	const loadCat = async () => {
		const cat = await CatApi.loadCatById(parseInt(id));
		setCat(cat);
	}

	const back = () => {
		window.history.back();
	}

	useEffect(() => {
		loadCat();
	}, []);

	return (
		<>
			<Button className="ml-32 mb-4" onClick={back}>
				뒤로 가기
			</Button>
			<section className="flex flex-col items-start justify-start px-[10vw] gap-4 mb-4">
				<div className="flex justify-center w-full">
					{
						cat &&
						<CatCard cat={cat}/>
					}
				</div>
				{
					cat &&
					(
						<>
							<h2 className="select-none">댓글: {cat.comments.length }개</h2>
							{
								cat.comments.map((comment, index) => (
									<CommentCard
										key={index}
										comment={comment}
										user={comment.user}
									/>
								))
							}	
						</>
					)
				}
			</section>
		</>
	);
}
