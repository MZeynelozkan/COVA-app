import { SidebarLink } from "@/types/types";

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/star.svg",
    route: "/",
    label: "Most Voted",
  },
  {
    imgURL: "/assets/icons/artists.svg",
    route: "/top-artists",
    label: "Top Artists",
  },
  {
    imgURL: "/assets/icons/products.svg",
    route: "/popular-products",
    label: "Popular Products Collections",
  },
  {
    imgURL: "/assets/icons/arts.svg",
    route: "/art-collections",
    label: "Art Collection",
  },
];
