import express from 'express';
import { fetchbar } from '../controllers/barberController.js';
const router = express.Router();


router.get('/', (req, res) => {
    // res.send('Shop home page')
    req.requestTime = Date.now()
    res.send('Hello world'+req.requestTime)
  })
router.get('/allBarber',fetchbar);



export default router;
