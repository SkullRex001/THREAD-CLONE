import mongoose from 'mongoose'

const connect = async ()=>{
    try{
       await mongoose.connect(process.env.MONGO)

       console.log('database connected')
    }

    catch(err) {
        console.log(err)
        process.exit(1)
    }
}

export default connect
