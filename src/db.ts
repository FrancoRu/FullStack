import mongoose from 'mongoose'

const uri = `mongodb+srv://${process.env.LOGINMONGOOSE}:${process.env.PASSWORDMONGOOSE}@cluster0.ewsorj3.mongodb.net/?retryWrites=true&w=majority`
// const uri = `mongodb+srv://francoRuggeri:XM7p3wmQPUlDtPwV@cluster0.ewsorj3.mongodb.net/?retryWrites=true&w=majority`
const connectDB = async () => {
  // console.log(uri2)
  try {
    await mongoose.connect(uri)
    console.log('Conexión exitosa a MongoDB Atlas')
  } catch (error: any) {
    console.log(process.env.PASSWORDMONGOOSE)
    console.error('Error de conexión a MongoDB Atlas:', error.message)
  }
}

export default connectDB
