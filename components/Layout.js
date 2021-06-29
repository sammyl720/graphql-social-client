import { useContext, useEffect } from "react"
import Context from "../context/general/Context"
import Navbar from "./Navbar"

function Layout ({ children }) {
  const { setToken, token } = useContext(Context)
  let client = typeof window != 'undefined'
  useEffect(() => {
    console.log(client)
    if(window && !token){
      if(window.localStorage.token){
        setToken(window.localStorage.token)
        console.log('setting token to state')
      }
    }

  }, [token, client])
  return (
    <div className='backdrop'>
      <Navbar />
      <main className='p-4 mt-14 h-full'>
        {children}
      </main>
    </div>
  )
}
export default Layout