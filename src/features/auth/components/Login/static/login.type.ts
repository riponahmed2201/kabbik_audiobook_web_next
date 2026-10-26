import { MouseEvent } from "react"

export type TLoginModal={
    // otpModal:(val:boolean)=>void,
    // passwordModal:(val:boolean)=>void,
    // setShowLoginModal:(val:boolean)=>void,
    handleSubmit:(e:MouseEvent<HTMLButtonElement>,phoneNumbers:string)=>void
}

export type TPhoneOfChangePassword={
    // otpModal:(val:boolean)=>void,
    // passwordModal:(val:boolean)=>void,
    // setShowLoginModal:(val:boolean)=>void,
    handleSubmit:(phone:string)=>void;
    closeShowPhoneOfChangePass:()=>void;
}