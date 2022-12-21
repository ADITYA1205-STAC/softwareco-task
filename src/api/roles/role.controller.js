const httpStatus = require('http-status');

const User = require('../users/user.model');
const Role = require('./role.model');
const ApiError = require('../../helpers/ApiError');

const addRole = async (req, res, next) => {
  try {
    const { modules } = req.body;
    const { id } = req.params;
    const user = await User.findById(id).select('modules email _id');
    if (!user) {
      throw new ApiError({
        message: 'user does not exist',
        status: httpStatus.NOT_FOUND,
      })
    }
    user.modules = [...user.modules, ...modules];
    await user.save();
    res.status(httpStatus.OK).json(user)
  } catch (err) {
    next(err);
  }
}


const removeRole = async (req, res, next) => {
  try {
    const { modules } = req.body;
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      throw new ApiError({
        message: 'user does not exist',
        status: httpStatus.NOT_FOUND,
      })
    }
    user.modules = user.modules.filter((module) => !modules.includes(module));
    await user.save();
    res.status(httpStatus.OK).json(user)
  } catch (err) {
    next(err);
  }
}

const create = async (req, res, next) => {
  try {
    const { name, modules } = req.body;
    const role = await Role.findOne({ name });
    if (role) {
      throw new ApiError({
        message: 'role already exist',
        status: httpStatus.NOT_FOUND,
      })
    }
    const newRole = await Role.create({ name, modules })
    res.status(httpStatus.OK).json(newRole)
  } catch (err) {
    next(err);
  }
}

const get = async (req, res, next) => {
  try {
    const { id } = req.params;
    const role = await Role.findById(id);
    if (!role) {
      throw new ApiError({
        message: 'role already exist',
        status: httpStatus.NOT_FOUND,
      })
    }
    res.status(httpStatus.OK).json(role)
  } catch (err) {
    next(err);
  }
}

const update = async (req, res, next) => {
  try {
    const { name, modules } = req.body;
    const { id } = req.params;
    const role = await Role.findByIdAndUpdate(id, { $set: { name, modules } }, { new: true });
    res.status(httpStatus.OK).json(role)
  } catch (err) {
    next(err);
  }
}

const deleteRole = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Role.findByIdAndRemove(id);
    res.status(httpStatus.NO_CONTENT).json({})
  } catch (err) {
    next(err);
  }
}


module.exports = {
  addRole,
  removeRole,
  deleteRole,
  create,
  update,
  get
}