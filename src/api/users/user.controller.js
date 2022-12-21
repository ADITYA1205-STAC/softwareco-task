const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const { omit } = require('lodash');

const User = require('./user.model');
const Role = require('../roles/role.model');
const { signToken } = require('../../helpers/index');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).lean();
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        error: 'user not found',
        statusCode: httpStatus.NOT_FOUND,
      });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(httpStatus.NOT_FOUND).json({
        error: 'Invalid credentials',
        statusCode: httpStatus.BAD_REQUEST,
      });
    }
    const token = await signToken({ id: user._id, email: user.email });
    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      data: {
        user: omit(user, ['password']),
        token,
      }
    })
  } catch (err) {
    next(err);
  }
}

const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const user = await User.findOne({ email }).lean();

    if (user) {
      return res.status(httpStatus.NOT_FOUND).json({
        error: 'user with same email already exist',
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    const role = await Role.findOne({ name: 'user' });

    const data = new User({
      email,
      password,
      name,
      role: role._id,
    });
    const newUser = await data.save();
    const token = await signToken({ id: newUser._id, email: newUser.email });

    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      data: {
        user: omit(newUser, ['password']),
        token,
      }
    })
  } catch (err) {
    next(err);
  }
}

const list = async (req, res, next) => {
  try {
    const { query } = req.query;
    const users = await User.find({
      name: {
        $regex: query || '',
        $options: 'i',
      }
    }).select('email name modules');
    res.status(httpStatus.OK).json(users)
  } catch (err) {
    next(err);
  }
}

const bulkUpdateDetails = async (req, res, next) => {
  try {
    const { ids, details } = req.body;
    const bulkUpdate = await User.updateMany({ _id: { $in: ids } },
      { $set: details }, { new: true });
    res.status(httpStatus.OK).json(bulkUpdate)
  } catch (err) {
    next(err);
  }
}

const bulkUpdateWithDiffCondition = async (req, res, next) => {
  try {
    const { details } = req.body;
    const bulkDetails = []
    for (const detail of details) {
      bulkDetails.push({
        'updateOne': {
          'filter': detail.condition,
          'update': detail.data
        }
      });
    }
    console.log(bulkDetails);
    const bulkUpdate = await User.bulkWrite(bulkDetails)
    res.status(httpStatus.OK).json(bulkUpdate)
  } catch (err) {
    next(err);
  }
}
module.exports = {
  login,
  register,
  list,
  bulkUpdateDetails,
  bulkUpdateWithDiffCondition,
}