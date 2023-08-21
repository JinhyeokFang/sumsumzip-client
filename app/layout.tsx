import "@/styles/globals.css";
import { Metadata } from "next";
import { Providers } from "./providers";
import clsx from "clsx";
import { NavigationBar } from "@/components/navigation-bar";
import { Divider } from "@nextui-org/divider";

export const metadata: Metadata = {
	title: {
		default: "숨숨집",
		template: `%s - 숨숨집`,
	},
	description: "고양이 사진 공유 웹서비스 숨숨집",
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
	],
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
				)}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
					<div className="relative flex flex-col h-screen">
            			<NavigationBar />
						<main className="container mx-auto max-w-7xl pt-8 px-6 flex-grow">
							{children}
						</main>
						<Divider />
						<footer className="w-full flex items-center justify-start p-4">
							<p className="text-[0.5rem]">
								서비스명: 숨숨집 <br />
								제작자: 방진혁 (hyeki0206@naver.com, jinhyeokfang@gmail.com)<br />
								서버 코드: <a href="https://github.com/jinhyeokfang/sumsumzip_springboot">https://github.com/jinhyeokfang/sumsumzip_springboot</a> &nbsp;
								클라이언트 코드: <a href="https://github.com/jinhyeokfang/sumsumzip-client">https://github.com/jinhyeokfang/sumsumzip-client</a> <br/>
							</p>
						</footer>
					</div>
				</Providers>
			</body>
		</html>
	);
}
