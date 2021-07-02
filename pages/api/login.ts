import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie';
const login =  async (req:NextApiRequest, res: NextApiResponse) => {
  switch(req.method){
    case 'POST':
      const setToken = cookie.serialize("token", req.body.token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24, // one day
      })
      
      res.setHeader('Set-Cookie', setToken)
      return res.status(200).json({ status: 200, message: "Logged in"})
    case 'GET':
      const cookies = cookie.parse(req.headers.cookie || '');
      const token = cookies.token || ''
      return res.status(200).json({ status: 200, message: "You requested your token", token: token || '' })
    default:
      return res.status(400).json({ message: `Hmmm. This route does not accept ${req.method} method requests`})
  }
} 

export default login;