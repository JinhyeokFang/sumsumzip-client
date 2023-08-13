'use client'
import { CatCard } from "@/components/cat-card";
import { useEffect, useState } from "react";
import { Cat } from "../api/interfaces/cat.interface";
import { CatApi } from "../api/cat.api";

interface ApiResponse {
	cats: Cat[];
}

const userId = 102;
export default function MyPage() {
	const [cats, setCats] = useState<Cat[]>([]);

	const loadCats = async () => {
		const catsFromApi = await CatApi.loadCatsByUserId(userId);
		setCats(catsFromApi);
	}

	useEffect(() => {
		loadCats();
	}, []);

	return (
		<section className="flex flex-col items-center justify-center px-32 gap-4">
			{
				cats
					.sort((a, b) => -(a.id - b.id))
					.map((cat, index) => (
						<CatCard
							key={index} 
							userId={cat.user.id + ""}
							profileImage={cat.user.picture}
							catImage={cat.url}
							title={cat.title}
							description={cat.description}
						/>
					))
			}
		</section>
	);
}
