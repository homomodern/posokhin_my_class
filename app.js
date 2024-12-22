import express from 'express'
import router from './src/route/index.js'

const PORT = 3000

const app = express()

app.use(express.json())

app.use(router)

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})

process.on('SIGINT', () => {
    console.log("\nGracefully quiting")
    process.exit(0)
})