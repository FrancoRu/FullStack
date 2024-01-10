import mongoose from 'mongoose'

const uri = `mongodb+srv://${process.env.LOGINMONGOOSE}:${process.env.PASSWORDMONGOOSE}@cluster0.ewsorj3.mongodb.net/?retryWrites=true&w=majority`

const connectDB = async () => {
  try {
    await mongoose.connect(uri)
    console.log('Conexión exitosa a MongoDB Atlas')
  } catch (error: any) {
    console.log(process.env.PASSWORDMONGOOSE)
    console.error('Error de conexión a MongoDB Atlas:', error.message)
  }
}

export default connectDB
