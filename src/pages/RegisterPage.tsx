import { z } from "zod"
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { useMutation } from "@tanstack/react-query"
import  { register as registerUser}   from "../api/auth" 
import { useAuth } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { getErrorMessage } from "../api/client";
const RegisterSchema = z
    .object({
        name: z.string().trim().min(2, "השם חייב להכיל 2-50 תווים").max(50, "השם חייב להכיל 2-50 תווים"),
        email: z.email("כתובת לא תקינה"),
        password: z
            .string()
            .min(8, "הסיסמא חייבת להכיל לפחות 8 תווים")
            .max(72, "הסיסמא יכולה להכיל עד 72 תווים")
            .regex(/[A-Za-z֐-׿]/, "הסיסמא חייבת להכיל לפחות אות אחת")
            .regex(/\d/, "הסיסמא חייבת להכיל לפחות ספרה אחת"),
        passwordReal: z.string().min(1, "יש להזין שוב את הסיסמא"),
    })
    .refine((data) => data.password === data.passwordReal, {
        message: "הסיסמאות אינן תואמות",
        path: ["passwordReal"],
    })

type RegisterForm = z.infer<typeof RegisterSchema>

export function RegisterPage(){


    const loginSuccess=useAuth().loginSuccess
    const navigate=useNavigate()
    const {mutate,isPending,error}=useMutation({
        mutationFn:(data:RegisterForm)=>registerUser(data.name,data.email,data.password),
        onSuccess:(res)=>{loginSuccess(res);navigate('/')}
        
    })
    function onSubmit(data:RegisterForm){mutate(data);}
    const {register,handleSubmit, formState: { errors } }=
    useForm<RegisterForm>({resolver:zodResolver(RegisterSchema)})    
    return <>
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
    <div>
        <label>שם</label>
        <input {...register('name')} type= "text" />
        <p>{errors.name?.message}</p>
    </div>
    <div>
        <label>אימייל</label>
        <input {...register('email')} type= "email" />
        <p>{errors.email?.message}</p>
    </div>
    <div>
        <label>סיסמא</label>
        <input {...register('password')} type="password" />
        <p>{errors.password?.message}</p>                 
    </div>  
    <div>
        <label>אימות סיסמא</label>
        <input {...register('passwordReal')} type="password" />
        <p>{errors.passwordReal?.message}</p>                 
    </div>
    {error&&<p>{getErrorMessage(error)}</p>}
    <button type="submit" disabled={isPending}>הרשם</button></form>
        <p>יש לך כבר חשבון? <Link to='/login'>התחבר</Link></p>
</>

}
    
