"use client";
import { Button } from "@/components/ui/button";
import { Nav, NavLinks } from "./Nav";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const MobileNav = ({ links, activeSection }: NavLinks) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          onClick={() => {
            setOpen(true);
          }}
        >
          <RxHamburgerMenu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="pt-5" aria-describedby="mobile navigation">
        <SheetTitle>Sections</SheetTitle>
        <Nav
          links={links}
          activeSection={activeSection}
          onNavClick={() => {
            setOpen(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
};
