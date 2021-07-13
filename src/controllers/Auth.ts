import jwt from 'jsonwebtoken';
import hashHelper from '../helpers/Hash';
import Response, { ErrorResponse } from '../helpers/Response';
import jwtHelper from '../helpers/Token';
// @ts-ignore
import db from '../database/models/index';
import Mailer from '../config/Mailer';

const { hashPassword } = hashHelper;
const { User } = db;

class Auth {
  static async createDriver(req: any, res: any) {
    try {
      const {
        name,
        email,
        password,
        phone_number,
        license_number,
        car_number,
      } = req.body;
      const driver = await User.create({
        name,
        email,
        password: hashPassword(password),
        phone_number,
        license_number,
        car_number,
        status: 'active',
        role: 'driver',
      });

      if (!driver) {
        const response = new ErrorResponse(400, 'Something went wrong');
        return res.status(response.code).json(response);
      }

      const otp = `${Math.floor(100000 + Math.random() * 900000)}`;

      const subject = 'Notification';
      const emailBody = `
      <h3 class="username">Hello ${name},</h3>
      <p class="message">
      Welcome to CSSAA... Verify your account with otp: ${otp}

      </p>
      <br/>`;
      Mailer.sendMail(email, subject, emailBody);

      const response = new Response(201, 'Registration successful', {
        name,
        email,
        phone_number,
        license_number,
        car_number,
      });
      return res.status(response.code).json(response);
    } catch (error) {
      console.log(error);
      const response = new ErrorResponse(
        500,
        'Server error, Please try again later'
      );
      return res.status(response.code).json(response);
    }
  }

  static async createPassenger(req: any, res: any) {
    try {
      const { name, email, password, phone_number } = req.body;
      const driver = await User.create({
        name,
        email,
        password: hashPassword(password),
        phone_number,
        status: 'active',
        role: 'passenger',
      });

      if (!driver) {
        const response = new ErrorResponse(400, 'Something went wrong');
        return res.status(response.code).json(response);
      }

      const response = new Response(201, 'Registration successful', {
        name,
        email,
        phone_number,
      });
      return res.status(response.code).json(response);
    } catch (error) {
      console.log(error);
      const response = new ErrorResponse(
        500,
        'Server error, Please try again later'
      );
      return res.status(response.code).json(response);
    }
  }

  static async login(req: any, res: any) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        const response = new ErrorResponse(
          404,
          "Email doesn't exist. Please signup to join"
        );
        return res.status(response.code).json(response);
      }
      const hash = user.password;
      console.log(user, password);
      const result = hashHelper.comparePassword(hash, password);
      if (!result) {
        const response = new ErrorResponse(
          400,
          'Incorrect password. Check password or click forgot password'
        );
        return res.status(response.code).json(response);
      }

      const { id, role } = user;
      const token = jwtHelper.generateToken({
        id,
        email,
        role,
      });

      const response = new Response(200, 'logged in successfully', {
        token,
        id,
      });
      return res.status(response.code).json(response);
    } catch (error) {
      console.log(error);
      const response = new ErrorResponse(
        500,
        'Server error, Please try again later'
      );
      return res.status(response.code).json(response);
    }
  }

  static async allUsers(req: any, res: any) {
    try {
      const users = await User.findAll();
      if (!users.length) {
        const response = new ErrorResponse(404, 'No user found');
        return res.status(response.code).json(response);
      }

      const response = new Response(200, 'Successfully retrieved', {
        users,
      });
      return res.status(response.code).json(response);
    } catch (error) {
      console.log(error);
      const response = new ErrorResponse(
        500,
        'Server error, Please try again later'
      );
      return res.status(response.code).json(response);
    }
  }
}

export default Auth;
