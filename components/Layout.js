import { useContext, useEffect } from "react"
import Context from "../context/general/Context"
import Navbar from "./Navbar"

const Layout = ({ children }) => {
  const { setToken, token } = useContext(Context)
  let client = typeof window != 'undefined'
  useEffect(() => {
    console.log(client)
    if(window && !token){
      console.log(window.localStorage.token)
      if(window.localStorage.token){
        setToken(window.localStorage.token)
        console.log('setting token to state')
      }
    }

  }, [token, client])
  return (
    <div className='backdrop'>
      <Navbar />
      <main className='m-4 my-auto'>
        {children}
      </main>
    </div>
  )
}
export default Layout