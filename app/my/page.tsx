'use client'
import { CatCard } from "@/components/cat-card";
import { useEffect, useState } from "react";
import { CatApi } from "../api/cat.api";
import { Scroll } from "@/util/scroll";
import { Cat } from "@/interfaces/cat.interface";
import { useAuth } from "@/states/auth";
import { UserApi } from "../api/user.api";

let pageNumber = 0;
export default function MyPage() {
	const auth = useAuth();
	const [cats, setCats] = useState<Cat[]>([]);

	// event listener에서는 state 불러오기가 불가능(useEffect 내에선 가능)하여 파라미터로 불러옴
	const loadCats = async (cats: Cat[]) => {
		if (auth.token === null) {
			throw new Error("로그인이 필요합니다.");
		}
		const userDataFromApi = await UserApi.getUserDataByToken(auth.token);
		const catsFromApi = await CatApi.loadCatsByUserId(parseInt(userDataFromApi.id),pageNumber);
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
							userName={cat.user.name}
							catId={cat.id}
                            userId={cat.user.id}
							key={index} 
							profileImage={cat.user.picture}
							catImage={cat.url}
							title={cat.title}
							like={cat.likeList.findIndex(user => user.email === auth.email) !== -1}
							description={cat.description}
						/>
					))
			}
		</section>
	);
}
