'use client';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { PageData } from "@/config/page-data";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { UserApi } from "@/app/api/user.api";

export const NavigationBar = () => {
    const pathname = usePathname();
    const [isLogined, setIsLogined] = useState(false);

    const loadAuth = async () => {
      const authData = await UserApi.getAuth();
      setIsLogined(authData.logined);
    }

    useEffect(() => {
      loadAuth();
    }, []);

    return (
        <Navbar>
          <NavbarBrand>
            <p className="font-bold text-inherit">숨숨집</p>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            {
                PageData(isLogined).map(page => (
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