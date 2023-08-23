'use client';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { PageData } from "@/config/page-data";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserApi } from "@/app/api/user.api";
import { Logo } from "./logo";
import { useRecoilState } from "recoil";
import { authState } from "@/states/auth";

export const NavigationBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const { push } = useRouter();
    const [auth, setAuth] = useRecoilState(authState);
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    const loadAuth = async () => {
      const authData = await UserApi.getAuth();
      setAuth(authData);
    }

    const onLogoClicked = () => {
      push('/');
    }

    useEffect(() => {
      loadAuth();
      setIsPageLoaded(true);
    }, []);

    return (
        <Navbar>
          <NavbarBrand className="cursor-pointer" onClick={onLogoClicked}>
            <p className="font-bold text-inherit pointer-events-none select-none">숨숨집</p>
            <Logo />
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4 select-none" justify="center">
            {
                isPageLoaded && PageData(auth.logined).map(page => (
                    <NavbarItem key={page.name} isActive={ page.link === pathname }>
                        <Link color="foreground" href={ page.link }>
                            { page.name }
                        </Link>
                    </NavbarItem>
                ))
            }
          </NavbarContent>
          <NavbarContent className="sm:hidden" justify="end">
            <NavbarMenuToggle />
          </NavbarContent>
          <NavbarMenu>
            {
                isPageLoaded && PageData(auth.logined).map(page => (
                    <NavbarItem key={page.name} isActive={ page.link === pathname }>
                        <Link color="foreground" href={ page.link }>
                            { page.name }
                        </Link>
                    </NavbarItem>
                ))
            }
          </NavbarMenu>
        </Navbar>
    );
}