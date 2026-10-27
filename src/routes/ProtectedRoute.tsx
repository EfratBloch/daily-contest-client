import type { ReactNode } from "react";
import type { Role } from "../types/user";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
export function ProtectedRoute({children,role}:{children:ReactNode,role:Role}){
    
    const {user,isLoading }=useAuth()
    if(isLoading)
        return<>טוען.....</>
    if(!user)
        return <Navigate to="/login" replace />
    if(user.role !== role)
        return <Navigate to="/" replace />

    
    return <>{children}</>
}