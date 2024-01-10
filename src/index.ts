import dotenv from 'dotenv'
dotenv.config()
import app from './app.ts'
import connectDB from './db.ts'
const PORT = 3000
connectDB()
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
