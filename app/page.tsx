'use client'
import { CatCard } from "@/components/cat-card";
import { useEffect, useState } from "react";

interface ApiResponse {
	cats: Record<string, string>[]
}

const getData = async (): Promise<ApiResponse | undefined> => {
	try {
		const res = await fetch('http://localhost:8080/cat?start=1&end=1000', {
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'no-cache'
		});
		return await res.json();
	} catch (error) {
		console.error(error);
	}
};

export default function Home() {
	const [cats, setCats] = useState<Record<string, unknown>[]>([]);
	useEffect(() => {
		getData().then(data => {
			setCats(data ? cats.concat(data.cats) : cats);
			console.log(data)
		})
	}, []);
	return (
		<section className="flex flex-col items-center justify-center gap-4">
			{
				cats
					.sort((a, b) => -(a.id - b.id))
					.map((cat, index) => (
					<CatCard
						key={cat.id} 
						userId={cat.userId}
						profileImage={cat.url}
						catImage={cat.url}
						title={cat.title}
						description={cat.description}
					/>
				))
			}
		</section>
	);
}
