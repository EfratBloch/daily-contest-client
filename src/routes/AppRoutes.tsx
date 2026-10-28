import { Routes, Route } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { ContestsPage } from '../pages/ContestsPage'
import { ContestPage } from '../pages/ContestPage'
import { SubmitPage } from '../pages/SubmitPage'
import { EditSubmissionPage } from '../pages/EditSubmissionPage'
import { MySubmissionsPage } from '../pages/MySubmissionsPage'
import { WinnersPage } from '../pages/WinnersPage'
import { ContestFormPage } from '../pages/ContestFormPage'
import { ManageContestPage } from '../pages/ManageContestPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ProtectedRoute } from './ProtectedRoute'
import { Layout } from './Layout'
import { TodayPage } from '../pages/TodayPage'
export function AppRoutes() {

    return <Routes>
        <Route element={<Layout/>}>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/register' element={<RegisterPage/>}></Route>
        <Route path='/contests' element={<ContestsPage/>}></Route>
        <Route path='/today' element={<TodayPage />}></Route>
        <Route path='/contests/:id' element={<ContestPage/>}></Route>
        <Route path='/contests/:id/submit' element={<ProtectedRoute role="USER"><SubmitPage /></ProtectedRoute>}></Route>
        <Route path='/submissions/:id/edit' element={<ProtectedRoute role="USER"><EditSubmissionPage /></ProtectedRoute>}></Route>
        <Route path='/my-submissions' element={<ProtectedRoute role="USER"><MySubmissionsPage /></ProtectedRoute>}></Route>
        <Route path='/winners' element={<WinnersPage/>}></Route>
        <Route path='/admin/contests/new' element={<ProtectedRoute role="ADMIN"><ContestFormPage /></ProtectedRoute>}></Route>
        <Route path='/admin/contests/:id/edit' element={<ProtectedRoute role="ADMIN"><ContestFormPage /></ProtectedRoute>}></Route>
        <Route path='/admin/contests/:id' element={<ProtectedRoute role="ADMIN"><ManageContestPage /></ProtectedRoute>}></Route>
        <Route path='*' element={<NotFoundPage />}>
        </Route></Route>
    </Routes>
}