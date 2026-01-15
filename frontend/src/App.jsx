


import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton, useUser } from '@clerk/clerk-react'
import { Navigate, Route, Routes } from 'react-router'
import Homepage from './pages/Homepage'


import Problemspage from './pages/Problemspage'
import { Toaster } from 'react-hot-toast'
import DashboardPage from './pages/DashboardPage'
import ProblemPage from './pages/ProblemPage'

function App() {

  const { isSignedIn, isLoaded } = useUser()
  if (!isLoaded) return null;
  //this will get rid of flickering effect

  return (
    <>
      <Routes>


        <Route path='/' element={!isSignedIn ? <Homepage /> : <Navigate to={"/dashboard"} />} />
        <Route path='/dashboard' element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />} />

        <Route path='/problems' element={isSignedIn ? <Problemspage /> : <Navigate to={"/"} />} />
        <Route path='/problem/:id' element={isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />} />
      </Routes>
      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  )
}

export default App

