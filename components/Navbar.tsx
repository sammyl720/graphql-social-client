import CustomLink from "./design/CustomLink"
import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import Context from "../context/general/Context"
import { memoryToken } from "../memory"
const Navbar = () => {
  const { logout, loadMe } = useContext(Context)
  useEffect(() => {
    if(memoryToken()){
      loadMe()
    }
  }, [memoryToken(), process.browser])
  const router = useRouter()
  return (
    <header className='w-screen flex items-center z-50 bg-indigo-900 p-4 px-8 lg:px-32 justify-between'>
      <CustomLink current='/landing' href='/Landing' title={<img className='w-12' src="/imgs/connections.png" alt="Logo" />} />
      <nav>
        {memoryToken() ? (
          <>
            <CustomLink href='/profile' title='Profile' current={router.route} />
            <span className='cursor-pointer text-blue-300' onClick={logout}>Logout</span>
          </>
        ) : (
          <>
            <CustomLink href='/login' title='Login' current={router.route} />
          </>
        )}
      </nav>
    </header>
  )
}
export default Navbar