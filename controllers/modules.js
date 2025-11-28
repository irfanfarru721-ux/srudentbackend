import Module from "../models/Module.js";

export const getModules = async (req, res) => {
  const modules = await Module.find();
  res.json(modules);
};
