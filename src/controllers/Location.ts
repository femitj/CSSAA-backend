import Sequelize from 'sequelize';
import Response, { ErrorResponse } from '../helpers/Response';
// @ts-ignore
import db from '../database/models/index';

const { User } = db;

class LocationController {
  static async saveLocation(req: any, res: any) {
    try {
      const { payload } = req.payload;
      const { id: userId } = payload;

      const { latitude, longitude } = req.body;
      const location = await User.update(
        {
          latitude,
          longitude,
        },
        { where: { id: userId } }
      );

      if (!location) {
        const response = new ErrorResponse(400, 'Something went wrong');
        return res.status(response.code).json(response);
      }

      const response = new Response(201, 'successful', {
        location,
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

  static async findCabs(req: any, res: any) {
    try {
      const { latitude: lat, longitude: lng } = req.body;

      const foundCabs = await User.findAll({
        attributes: [
          'id',
          'name',
          'car_number',
          'phone_number',
          [
            Sequelize.literal(
              '6371 * acos(cos(radians(' +
                lat +
                ')) * cos(radians(latitude)) * cos(radians(' +
                lng +
                ') - radians(longitude)) + sin(radians(' +
                lat +
                ')) * sin(radians(latitude)))'
            ),
            'distance',
          ],
        ],
        where: { role: 'driver', status: 'active' },
        order: Sequelize.col('distance'),
        limit: 10,
      });

      if (!foundCabs.length) {
        const response = new Response(404, 'No cabs available!', []);
        return res.status(response.code).json(response);
      }

      const response = new Response(201, 'Registration successful', {
        available_cabs: foundCabs,
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

export default LocationController;
