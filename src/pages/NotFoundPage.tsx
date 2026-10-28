import { Link } from "react-router-dom"
export function NotFoundPage(){
    return <>
   <h1>הדף לא נמצא</h1>
   <p>הכתובת שחיפשת לא קיימת</p>
   <Link to="/" className="btn">חזרה לדף הבית</Link>
</>
}