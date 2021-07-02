import { GetServerSideProps } from "next"
import { useContext, useEffect } from "react"
import Context from "../context/general/Context"
import Navbar from "./Navbar"
import Toast from "./design/Toast"
function Layout ({ children }) {
  const { setToken, token, error, message, setError, setMessage } = useContext(Context)
  let client = typeof window != 'undefined'
  useEffect(() => {
    if(window && !token){
      if(window.localStorage.token){
        setToken(window.localStorage.token)
      }
    }

  }, [token, client])
  return (
    <div className='backdrop'>
      <Navbar />
      {error && (
        <Toast message={error} type='error' onLeave={() => setError(null) } />
      )}
      {message && (
        <Toast message={message} type='success' onLeave={() => setMessage(null) } />
      )}
      <main className='p-4 mt-14 h-full w-screen lg:max-w-lg mx-auto'>
      <Toast message={'whats uo'} type='success' onLeave={() => {} } />

        {children}
      </main>
    </div>
  )
}


export default Layout
