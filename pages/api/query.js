export default (req, res) => {
  console.log(req.body)
  res.statusCode = 200 
  return res.json({ message: "a ok"})
}