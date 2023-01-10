import { Router } from "express";
import * as ControlTrans from './controller/trans.js'
const router = Router();

// Add transportati./on route (requires admin role)
router.post('/add', ControlTrans.addTrans)



// Get transportation by end location route
router.get('/location/:location', ControlTrans.getTransByEndlocation)
  



// Get transportation by end location and category route
router.get('/location/:location/category/:category',ControlTrans.getWithEndAndCategory );



// Get all transportation from specific start location to specific end location route
router.get('/from/:from/to/:to', );

export default router;