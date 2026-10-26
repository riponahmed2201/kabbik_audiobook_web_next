import { TCategoryItem } from "@/shared/ui/static/types";
import { Dispatch, SetStateAction } from "react";

export type TmobileNavbarProps={
    categories:TCategoryItem[] | null;
    onClose:()=>void;
    setMobileMenu:Dispatch<SetStateAction<boolean>>;
}