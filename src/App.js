import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'


import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Overview, Tasks, Users, Customers } from './pages';
import './App.css';
import { useStateContext } from './contexts/ContextProvider';
import { AuthContext } from './contexts/auth-context';
import Login from "./auth/Login"

let logoutTimer;
const App = () => {
const [token,setToken]=useState(null);
const [userId,setUserId]=useState(null);
const [expDate,setExpDate]=useState(null)
const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
const client=new QueryClient();


const login=useCallback((userId,token,expDate=new Date(new Date().getTime()+1000*60*60))=>{
setToken(token);
setExpDate(expDate);
setUserId(userId);

localStorage.setItem(
  "userData",
  JSON.stringify({
    token,
    userId,
    expDate: expDate,
  }))

},[])

const logout=useCallback(()=>{
  setToken(null);
setExpDate(null);
setUserId(null);
localStorage.clear();
},[])

useEffect(()=>{
  const userData = JSON.parse(localStorage.getItem("userData"));
  if(userData && userData.token && userData.userId && new Date(userData.expDate)>new Date()){
    login(userData.userId,userData.token,userData.expDate);
  }else{
    localStorage.clear()
  }
},[login])

useEffect(()=>{
  if(token && expDate){
    const remainingLogoutTime=new Date(expDate).getTime()-new Date().getTime();
     logoutTimer=setTimeout(logout,remainingLogoutTime);
  }else{
  clearTimeout(logoutTimer)
  }
},[token,expDate,logout])


  return (
   <AuthContext.Provider value={{isLoggedIn:!!token,login,logout,token,userId}}>

<QueryClientProvider client={client}>
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
      { !token ?
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route
          path={"*"}
          element={!token && <Navigate to="/" replace />}
        />
      </Routes>
      : <div className="flex relative dark:bg-main-dark-bg">
          
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex- 2'
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && (<ThemeSettings />)}

              <Routes>
                {/* dashboard  */}
                <Route path="/" element={(<Overview />)} />
                <Route path="/Overview" element={(<Overview />)} />

                {/* pages  */}
                <Route path="/Tasks" element={<Tasks />} />
                <Route path="/Users" element={<Users />} />
                <Route path="/customers" element={<Customers />} />
                <Route
          path={"*"}
          element={<Navigate to="/" replace />}
        />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>}
      </BrowserRouter>
    </div>
    </QueryClientProvider>

    </AuthContext.Provider>
  );
};

export default App;
