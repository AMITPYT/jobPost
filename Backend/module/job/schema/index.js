const yup = require("yup");

const jobSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  company: yup.string().required("Company is required"),
  type: yup.string().required("Type is required"),
  location: yup.string().required("Location is required"),
  description: yup.string().required("Description is required"),
});

module.exports = jobSchema;
