'use client'
import { CatCard } from "@/components/cat-card";
import { useEffect, useState } from "react";
import { Cat } from "./api/interfaces/cat.interface";
import { CatApi } from "./api/cat.api";
import { Scroll } from "@/util/scroll";

let pageNumber = 0;
export default function Home() {
	const [cats, setCats] = useState<Cat[]>([]);

	// event listener에서는 state 불러오기가 불가능(useEffect 내에선 가능)하여 파라미터로 불러옴
	const loadCats = async (cats: Cat[]) => {
		const catsFromApi = await CatApi.loadCats(pageNumber);
		pageNumber += 1;
		Scroll.keepPosition(window, () => {
			setCats(catsFromApi ? cats.concat(catsFromApi) : cats);
		})
	}

	useEffect(() => {
		loadCats(cats);
	}, []);
	useEffect(() => {
		const handler = () => {
			if (Scroll.isBottom(window))
				loadCats(cats);
		}
		window.addEventListener('scroll', handler);
		return () => {
			window.removeEventListener('scroll', handler)
		};
	}, [cats]);

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
