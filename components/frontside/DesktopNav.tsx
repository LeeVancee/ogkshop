"use client"

import * as React from "react"
import Link from "next/link"
import {cn} from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu"
import {Category} from "@/types";

interface categoryProps {
  data: Category[];
}

export default function DesktopNav({data}: categoryProps) {
  return (
    <NavigationMenu delayDuration={0} className="lg:flex pl-2">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className=" text-muted-foreground">Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[300px] ">
              {data.map((category) => (
                <li key={category.id}>
                  <Link href={`/category/${category.name}`}
                        className={cn(
                          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                        )}>
                    <NavigationMenuLink>
                      <div className="text-sm font-medium leading-none">{category.name}</div>
                    </NavigationMenuLink>

                  </Link>

                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuIndicator/>
      </NavigationMenuList>

    </NavigationMenu>
  )
}


