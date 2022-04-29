import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
//import { MongoError } from 'mongodb';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    console.log(exception);
    // console.log(response);

    const errorResponse = {
      statusCode: 400,
      message: [],
      error: 'Bad Request',
    };

    switch (exception.code) {
      case 11000:
        const duplicateError = Object.keys(exception.keyValue);
        if (duplicateError.length) {
          errorResponse.message.push({
            property: duplicateError[0],
            value: exception.keyValue[duplicateError[0]],
            constraints: {
              isDuplicate: `${duplicateError[0]} is duplicated`,
            },
          });

          return response.status(400).json(errorResponse);
        }
    }
    super.catch(exception, host);
  }
}
