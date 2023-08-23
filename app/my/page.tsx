'use client'
import { CatCard } from "@/components/cat-card";
import { useEffect, useState } from "react";
import { CatApi } from "../api/cat.api";
import { Scroll } from "@/util/scroll";
import { Cat } from "@/interfaces/cat.interface";
import { useAuth } from "@/states/auth";
import { UserApi } from "../api/user.api";
import { Upload } from "@/components/upload-card";
import { ProfileCard } from "@/components/profile-card";
import { User } from "@/interfaces/user.interface";

let pageNumber = 0;
export default function MyPage() {
	const auth = useAuth();
	const [cats, setCats] = useState<Cat[]>([]);
    const [user, setUser] = useState<User>();

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

    const loadUser = async () => {
		if (auth.token === null) {
			throw new Error("로그인이 필요합니다.");
		}
		const userDataFromApi = await UserApi.getUserDataByToken(auth.token);
        setUser(userDataFromApi as any as User);
    }

	useEffect(() => {
		loadUser();
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
		<section className="flex flex-col items-center justify-center px-[10vw] gap-4">
			{
				user && auth.email && 
				<>
					<ProfileCard
						user={user}
						onFollowChange={() => {}}
						initialFollow={false}
					/>
				</>
			}
			<Upload />
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
