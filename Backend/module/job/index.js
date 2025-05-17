const express = require("express");
const router = express.Router();
const {jobController} = require("./controller/index");

router.get("/get", jobController.getJobs); 
router.get("/get/:id", jobController.getJobById); 
router.post("/add-job", jobController.createJob); 

module.exports = router;
