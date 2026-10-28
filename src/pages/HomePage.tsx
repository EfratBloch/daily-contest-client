import { useQuery } from "@tanstack/react-query"
import { getHome } from "../api/contests"
import { getErrorMessage } from "../api/client"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
export function HomePage(){
    const {user}=useAuth()
    const{isLoading,data,error}=useQuery({queryKey:['home'],queryFn:getHome})    
    if(isLoading)
        return <p>טוען...</p>
    if(error)
        return <p>{getErrorMessage(error)}</p>
    return <div className="home">
    <h1>תחרות היום </h1>
    <p className="hero-text">כל יום נושא חדש. מגישים תמונה או קטע כתיבה, מצביעים לאהובים, ומגלים מי ניצחה!</p>

    <div className="hero-actions">
        {data?.activeContest && <Link to={`/contests/${data.activeContest.id}`}>לתחרות של היום: {data.activeContest.title}</Link>}
        {!user && <>
            <Link to="/register">הרשמה</Link>
            <Link to="/login">התחברות</Link>
        </>}
    </div>

    <div className="drawings">
        <span className="burst">🏆</span>
        <span className="burst">🎨</span>
        
    </div>
    <div className="steps">
    <div className="step">
        <span>📸</span>
        <h3>מעלים</h3>
        <p>תמונה או קטע כתיבה לפי הנושא</p>
    </div>
        
    <div className="step">
        <span>👆</span>
        <h3>מצביעים</h3>
        <p>בוחרים עד 3 יצירות שהכי אהבתם, ונותנים להן קול</p>
    </div>
      
    <div className="step">
        <span>🏆</span>
        <h3>זוכים</h3>
        <p>שלוש היצירות עם הכי הרבה קולות מוכרזות כמנצחות</p>
    </div>

    
    </div>

</div>
}
