import CustomLink from "./design/CustomLink"
import { useRouter } from "next/router"
const Navbar = () => {
  const router = useRouter()
  console.log(router.route)
  return (
    <header className='w-screen flex items-center bg-indigo-900 p-4 justify-between'>
      <CustomLink href='/Landing' title={<img className='w-12' src="imgs/connections.png" alt="Logo" />} />
      <nav className=''>
        <CustomLink href='/' title='Home' current={router.route} />
        <CustomLink href='/login' title='Login' current={router.route} />
        <CustomLink href='/signup' title='Sign Up' current={router.route} />
      </nav>
    </header>
  )
}

export default Navbar