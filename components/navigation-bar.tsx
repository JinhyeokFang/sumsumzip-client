'use client';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { PageData } from "@/config/page-data";
import { usePathname } from "next/navigation";

export const NavigationBar = () => {
    const pathname = usePathname();

    return (
        <Navbar>
          <NavbarBrand>
            <p className="font-bold text-inherit">숨숨집</p>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            {
                PageData.map(page => (
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