const Job = require("../../../models/job");

const getAllJobs = async (title = "", location = "") => {
  try {
    const query = {
      title: { $regex: title, $options: "i" },
      location: { $regex: location, $options: "i" },
    };
    const jobs = await Job.find(query).sort({ createdAt: -1 });
    return jobs;
  } catch (error) {
    throw new Error("Failed to fetch jobs");
  }
};

const getJobById = async (id) => {
  try {
    const job = await Job.findById(id);
    return job;
  } catch (error) {
    throw new Error("Failed to fetch job by ID");
  }
};

const createJob = async (data) => {
  try {
    const job = new Job(data);
    const savedJob = await job.save();
    return savedJob;
  } catch (error) {
    throw new Error("Failed to create job");
  }
};

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
};
