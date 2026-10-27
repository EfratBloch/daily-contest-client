import { z } from "zod"
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { useMutation } from "@tanstack/react-query"
import { login } from "../api/auth"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { getErrorMessage } from "../api/client";
import { Link } from "react-router-dom"
const loginSchema=z.object({password:z.string().min(1,'יש להזין סיסמא'),email:z.email("כתובת לא תקינה")})

type LoginForm=z.infer<typeof loginSchema>


export function LoginPage(){

    const loginSuccess=useAuth().loginSuccess
    const navigate=useNavigate()
    const {mutate,isPending,error}=useMutation({
        mutationFn:(data:LoginForm)=>login(data.email,data.password),
        onSuccess:(res)=>{loginSuccess(res);navigate('/')}
        
    })
    function onSubmit(data:LoginForm){mutate(data);}
    const {register,handleSubmit, formState: { errors } }=
    useForm<LoginForm>({resolver:zodResolver(loginSchema)})    
    return <>
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
    {error&&<p>{getErrorMessage(error)}</p>}
    <button type="submit" disabled={isPending}>התחבר</button></form>
    <p>אין לך חשבון.<Link to='/register'>הרשם</Link></p>

    </>
}