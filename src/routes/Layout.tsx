import { Outlet,Link,useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
export function Layout(){
     const {user,isLoading,logout}=useAuth()
     const navigate=useNavigate()
     const handleLogout=()=>{
        logout();
        navigate('/')}
   return <>
   <header className="site-header">
        <span className="logo">DAILYCONTEST</span>
        <nav className="nav">
            <Link to ='/'>דף הבית</Link>
            <Link to ='/today'>תחרות היום</Link>
            <Link to ='/contests'>לכל התחרויות</Link>
            <Link to ='/winners'>מנצחים</Link>
            {!isLoading&&!user&&<><Link to ='/register'>הרשמה</Link><Link to ='/login'>התחברות</Link></>}
            {user&&<><p>שלום ל{user.name}</p><button onClick={handleLogout}>התנתקות</button>{user.role==='USER'?<Link to ='/my-submissions'>ההגשות שלי</Link>:<Link to ='/admin/contests/new'>תחרות חדשה</Link>}</>}
        </nav>
    </header>
    <main className="container"><Outlet/></main>

    </>
}