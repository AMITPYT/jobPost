const jobSchema = require("../schema/index");
const jobService = require("../service/jobService");

const getJobs = async (req, res) => {
  try {
    const { title = "", location = "" } = req.query;
    const jobs = await jobService.getAllJobs(title, location);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message || "Server Error" });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await jobService.getJobById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message || "Server Error" });
  }
};

const createJob = async (req, res) => {
  try {
     await jobSchema.validate(req.body, { abortEarly: false });
    const { title, company, type, location, description } = req.body;
    if (!title || !company || !type || !location || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const job = await jobService.createJob(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message || "Server Error" });
  }
};

module.exports = {
  getJobs,
  getJobById,
  createJob,
};
