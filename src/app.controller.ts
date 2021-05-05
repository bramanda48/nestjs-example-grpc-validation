import { Body, Controller, Get, Logger, UsePipes, ValidationError, ValidationPipe } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { Metadata } from 'grpc';
import { CreateSessionDto, CreateSessionResponseDto } from './dto/create-session.dto';
import { GrpcStatus } from './status';

@Controller()
export class AppController {
	constructor() {}

    // Define logger
    private readonly logger = new Logger(AppController.name);

	@GrpcMethod('Session', 'Create')
    @UsePipes(new ValidationPipe({
        exceptionFactory: (error: ValidationError[] = []) => {
            let errorMessage: string[] = [];
            error[0].children.forEach(function(v) {
                const message: string[] = Object.values(v.constraints);
                errorMessage.push(...message);
            });
            return new RpcException({
                code: GrpcStatus.INVALID_ARGUMENT,
                message: errorMessage.join(','),
            });
        },
    }))
	create(@Body() data: CreateSessionDto, metadata: Metadata): CreateSessionResponseDto {
        this.logger.debug(JSON.stringify(data));
		return new CreateSessionResponseDto('This is response');
	}
}
