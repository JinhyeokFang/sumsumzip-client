'use client'
import { CatCard } from "@/components/cat-card";
import { useEffect, useState } from "react";
import { Cat } from "@/interfaces/cat.interface";
import { useAuth } from "@/states/auth";
import { CatApi } from "../api/cat.api";
import { user } from "@nextui-org/theme";

export default function Like() {
	const [cats, setCats] = useState<Cat[]>([]);
	const auth = useAuth();

	// event listener에서는 state 불러오기가 불가능(useEffect 내에선 가능)하여 파라미터로 불러옴
	const loadCats = async () => {
		if (auth.token === null) {
			throw new Error("로그인이 필요합니다.");
		}
		const catsFromApi = await CatApi.loadCatsByLikeList(auth.token)
		setCats(catsFromApi);
	}

	useEffect(() => {
		loadCats();
	}, [auth]);

	return (
		<section className="flex flex-col items-center justify-center px-[10vw] gap-4">
			{
				cats
					.sort((a, b) => -(a.id - b.id))
					.map((cat, index) => (
						<CatCard
							key={index}
							cat={cat}
						/>
					))
			}
		</section>
	);
}
