import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import grades from './routes/grades.mjs'

const PORT = process.env.PORT || 3000;
const app = express();

// //running a side-effect (run another file to test)
// import './db/conn.mjs'

//Body-parser middleware
//Enable server to parse incoming json data, and then places it in the req.body
app.use(express.json());

//API Routes
app.use('/grades', grades)

app.get(`/`, (req, res) => {
    res.send(`<h1 style="color: skyblue">Welcome to the API</h1>`)
})


//Global error handling middleware
app.use((err, req, res, next) => {
    res.status(500).send(`Seems like we messed up somewhere...`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});