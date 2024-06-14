import express from 'express';
import db from '../db/conn.mjs';
import { ObjectId } from 'mongodb';


const router = express.Router();

//Grades Routes

//Create a single grade entry
router.post(`/`, async (req, res) => {
    try {
        let collection = await db.collection('grades');
        let newDocument = req.body;

        if(newDocument.student_id) {
            newDocument.learner_id = newDocument.student_id;
            delete newDocument.student_id;
        }
        
        let result = await collection.insertOne(newDocument);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get a single grade entry by Id
router.get('/:id', async (req, res)=>{
    try{
        let id;
        try{
            id = new ObjectId(req.params.id);
        }catch(err){
            res.status(400).send('ObjectId is not valid');
            return;
        }
        let collection = await db.collection('grades');
        let query = { _id: id }
        let result = await collection.findOne(query);

        if(!result) {
            throw error('Not Found', 404);
        } else {
            res.status(200).json(result)
        }
    } catch(err) {
        res.status(err.status).send(err.message);
    }
});

router.get('/learner/:id', async (req, res) => {
    try {
        let collection = await db.collection(`grades`);
        let query = { learner_id: Number(req.params.id)};
        let result = await collection.find(query).toArray();

        if(!result.length){
            throw error("Not found", 404)
        } else {
            res.status(200).json(result)
        }
    } catch (err) {
        res.status(err.status).send(err.message);
    }
});

router.get('/student/:id', (req, res) => {
    res.redirect(`../learner/${req.params.id}`);
});
// Get a class's grade data
router.get("/class/:id", async (req, res) => {
    let collection = await db.collection("grades");
    let query = { class_id: Number(req.params.id) };
  
    // Check for learner_id parameter
    if (req.query.learner) query.learner_id = Number(req.query.learner);
  
    let result = await collection.find(query).toArray();
  
    if (!result.length) res.send("Not found").status(404);
    else res.send(result).status(200);
  });

//Helper Fuction
function error(message, status) {
    const error = new Error(message);
    error.status = status;
    return error
}
export default router;