import { Module } from '@nestjs/common';
import {ConfigModule as NestConfigModule} from '@nestjs/config'
import * as Joi from 'joi'
@Module({
    imports: [NestConfigModule.forRoot({
        validationSchema: Joi.object({
            MONGODB_URI : Joi.string().required(),
            JWT_SECRET : Joi.string().required(),
            JWT_EXPIRATION: Joi.string().required(),
        }),
    })],
      exports: [NestConfigModule], 
})
export class ConfigModule {}
