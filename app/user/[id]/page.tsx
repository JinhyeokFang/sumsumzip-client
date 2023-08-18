'use client'
import { CatCard } from "@/components/cat-card";
import { useEffect, useState } from "react";
import { Scroll } from "@/util/scroll";
import { Cat } from "@/interfaces/cat.interface";
import { useAuth } from "@/states/auth";
import { UserApi } from "@/app/api/user.api";
import { CatApi } from "@/app/api/cat.api";
import { useParams } from "next/navigation";
import { User } from "@/interfaces/user.interface";
import { ProfileCard } from "@/components/profile-card";

let pageNumber = 0;
export default function Home() {
	const auth = useAuth();
	const id = useParams().id;
	const [cats, setCats] = useState<Cat[]>([]);
    const [user, setUser] = useState<User>();

	// event listener에서는 state 불러오기가 불가능(useEffect 내에선 가능)하여 파라미터로 불러옴
	const loadCats = async (cats: Cat[]) => {
		if (auth.token === null) {
			throw new Error("로그인이 필요합니다.");
		}
		const catsFromApi = await CatApi.loadCatsByUserId(parseInt(id), pageNumber);
		pageNumber += 1;
		Scroll.keepPosition(window, () => {
			setCats(catsFromApi ? cats.concat(catsFromApi) : cats);
		})
	}

    const loadUser = async () => {
		const userDataFromApi = await UserApi.getUserDataByUserId(parseInt(id));
        setUser(userDataFromApi as any as User);
    }

	useEffect(() => {
		loadCats(cats);
        loadUser();
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

    const onFollowChange = (follow: boolean) => {
        if (auth.token === null) {
            throw new Error("로그인이 필요합니다.");
        }
        if (follow) {
            UserApi.follow(auth.token, parseInt(id));
        } else {
            UserApi.unfollow(auth.token, parseInt(id));
        }
    }

	return (
		<section className="flex flex-col items-center justify-center px-32 gap-4">
            {
                user && auth.email && 
                <>
                    <ProfileCard
                        user={user}
                        onFollowChange={onFollowChange}
                        initialFollow={user.followers.findIndex(user => user.email === auth.email) !== -1}
                    />
                </>
            }
			{
				cats
					.sort((a, b) => -(a.id - b.id))
					.map((cat, index) => (
						<CatCard
							userName={cat.user.name}
                            userId={cat.user.id}
							catId={cat.id}
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
