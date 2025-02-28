"use client";
import React, { ReactNode } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useRouter } from 'next/navigation';

type DropDownItem = {
  icon: ReactNode;
  title: string;
  url: string;
}

type DropdownMenuProps = {
  menuButton: ReactNode;
  menuItems: DropDownItem[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  menuButton,
  menuItems
}) => {
  const router = useRouter();

  const handleClick = (url: string) => {
    router.push(url);
  }

  return (
    <Menu>
      <MenuButton>{menuButton}</MenuButton>
      <MenuItems
          transition
          anchor="bottom end"
          className="z-50 w-[10rem] origin-top-right rounded-lg border border-thirdly bg-backPrimary p-1 py-2 mt-2 text-base text-secondary transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          {menuItems.map((item, index) => (
            <MenuItem key={index}>
              <div>
                <button onClick={() => handleClick(item.url)} className="group flex w-full items-center gap-2 rounded-md py-2 px-3 data-[focus]:bg-white/10">
                  {item.icon}
                  {item.title}
                </button>
                
              </div>
          </MenuItem>
          ))}
        </MenuItems>
    </Menu>
  )
}

export default DropdownMenu;
