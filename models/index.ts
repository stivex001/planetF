import { UseFormRegister } from "react-hook-form";
import { AuthFormFields, AuthFormTypes } from "./auth";

export type FormTypes = UseFormRegister<AuthFormTypes >


export type FormFields = AuthFormFields ;