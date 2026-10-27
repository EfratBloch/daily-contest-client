import type { User } from '../types/user'
import type { AuthResponse } from '../types/api'
import { createContext, type ReactNode } from 'react'
import { useState ,useEffect,useContext} from 'react'
import { getMe } from '../api/auth'

interface AuthContextValue {
    user: User | null
    isLoading: boolean
    loginSuccess: (data: AuthResponse) => void
    logout: () => void
}
const AuthContext = createContext<AuthContextValue | null>(null)
export function AuthProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(localStorage.getItem('token') !== null)
    const loginSuccess = (data: AuthResponse) => {
        localStorage.setItem('token', data.token);
        setUser(data.user)
    }
    const logout = () => {
    localStorage.removeItem('token');
    setUser(null)
    }
    useEffect(()=>{if(!localStorage.getItem('token'))return;getMe().then(setUser).catch(logout).finally(()=>setIsLoading(false))},[])
    return (<AuthContext.Provider value={{user,isLoading,loginSuccess,logout}}>
        {children}
        </AuthContext.Provider>)
}
export function useAuth(){
const context=useContext(AuthContext)
if(!context)
    throw Error("useAuth must be used inside AuthProvider")
return context
}