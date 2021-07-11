import Sequelize from 'sequelize';
import { check, param, body } from 'express-validator';
// @ts-ignore
import db from '../database/models';
const { User } = db;

export const schema = [
  check('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Email address is required')
    .isEmail()
    .withMessage('Email address is invalid')
    .customSanitizer((value) => value.toLowerCase())
    .custom(async (value) => {
      const isFound = await User.findOne({ where: { email: value } });
      if (isFound) {
        throw new Error('Email already exists');
      }
      return true;
    }),

  check('password')
    .exists()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage(
      'Password must be alphanumeric and not be less than 8 characters'
    ),
];

export const driverLoginSchema = [
  check('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Email address is required')
    .isEmail()
    .withMessage('Email address is invalid')
    .customSanitizer((value) => value.toLowerCase())
    .custom(async (value) => {
      const isFound = await User.findOne({
        where: { email: value },
        attributes: ['id', 'role'],
      });
      if (isFound) {
        const { role } = isFound;
        if (role !== 'driver') {
          throw new Error('You do not have access to this resource');
        }
      }
      return true;
    }),

  check('password').exists().withMessage('Password is required'),
  // .isLength({ min: 8 })
  // .withMessage(
  //   'Password must be alphanumeric and not be less than 8 characters'
  // ),
];

export const driverSignupSchema = [
  ...schema,
  check('license_number')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Phone number is required')
    .custom(async (value) => {
      const isFound = await User.findOne({
        where: { license_number: value },
        attributes: ['license_number'],
      });
      if (isFound) {
        throw new Error('License number exists already');
      }
      return true;
    }),
  check('car_number')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Car number is required')
    .custom(async (value) => {
      const isFound = await User.findOne({
        where: { car_number: value },
        attributes: ['car_number'],
      });
      if (isFound) {
        throw new Error('Car number exists already');
      }
      return true;
    }),
  check('phone_number')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Phone number is required')
    .custom(async (value) => {
      const isFound = await User.findOne({
        where: { phone_number: value },
        attributes: ['phone_number'],
      });
      if (isFound) {
        throw new Error('Phone number exists already');
      }
      return true;
    }),
];

export const userLoginSchema = [
  check('email')
    .trim()
    .optional()
    .isEmail()
    .withMessage('Email address is invalid')
    .customSanitizer((value) => value.toLowerCase())
    .custom(async (value) => {
      const isFound = await User.findOne({
        where: { email: value },
        attributes: ['id', 'role'],
      });
      if (isFound) {
        const { role } = isFound;
        if (role !== 'passenger') {
          throw new Error('You do not have access to this resource');
        }
      }
      return true;
    }),

  // check('phoneNumber')
  //   .trim()
  //   .optional()
  //   .custom(async (value) => {
  //     const isFound = await User.findOne({
  //       where: { phoneNumber: value },
  //       attributes: ['id', 'roleId'],
  //     });
  //     if (isFound) {
  //       const { roleId } = isFound;
  //       const findRole = await RolePrivilege.findOne({
  //         where: { roleId, privilegeName: '/access_user' },
  //         attributes: ['privilegeName'],
  //       });
  //       if (!findRole) {
  //         throw new Error('You do not have access to this resource');
  //       }
  //     }
  //     return true;
  //   }),

  check('password')
    .exists()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage(
      'Password must be alphanumeric and not be less than 8 characters'
    ),
];
