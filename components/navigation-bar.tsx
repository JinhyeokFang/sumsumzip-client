'use client';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { PageData } from "@/config/page-data";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { UserApi } from "@/app/api/user.api";
import { Logo } from "./logo";
import { useRecoilState } from "recoil";
import { authState } from "@/states/auth";

export const NavigationBar = () => {
    const pathname = usePathname();
    const [auth, setAuth] = useRecoilState(authState);
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    const loadAuth = async () => {
      const authData = await UserApi.getAuth();
      setAuth(authData);
    }

    useEffect(() => {
      loadAuth();
      setIsPageLoaded(true);
    }, []);

    return (
        <Navbar>
          <NavbarBrand>
            <p className="font-bold text-inherit">숨숨집</p>
            <Logo />
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
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
        </Navbar>
    );
}