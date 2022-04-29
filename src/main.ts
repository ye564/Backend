import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './global/validation-error.filter';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'debug', 'error', 'warn'],
  });
  app.useGlobalPipes(new ValidationPipe({
    validationError: {
      target: false
    },
    exceptionFactory: (error: ValidationError[] = []) => {
      return new BadRequestException(error);
    }
  }));
  // AllExceptionsFilter
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  await app.listen(process.env.PORT);
}
bootstrap();
