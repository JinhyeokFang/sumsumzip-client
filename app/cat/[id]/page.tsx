'use client'
import { CatCard } from "@/components/cat-card";
import { useEffect, useState } from "react";
import { CatApi } from "@/app/api/cat.api";
import { useParams } from "next/navigation";
import { Cat } from "@/app/api/interfaces/cat.interface";
import { Button } from "@nextui-org/button";

export default function CatPage() {
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
			<section className="flex flex-col items-center justify-center px-32 gap-4">
				{
					cat &&
					<CatCard
						userId={""}
						profileImage={cat.user.picture}
						catImage={cat.url}
						title={cat.title}
						description={cat.description}
					/>
				}
			</section>
		</>
	);
}
