import express from "express"
const port = process.env.PORT || 3000
import  Router from './Source/Routes/web.js'

const app = express()

app.use(express.json())
app.use('/', Router)


app.listen(port , () => {
    console.log(`App run on ${port}`)
})