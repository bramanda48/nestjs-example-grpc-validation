import { ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, RpcException, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { GrpcStatus } from './status';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// Add grpc for microservices
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.GRPC,
        options: {
            package: 'microservice.auth',
            url: 'localhost:5001',
            protoPath: [
                join(__dirname, '../proto/auth/session.proto'),
            ],
            loader: {keepCase: true},
        }
    });

    // Add validation pipe
    /**
     * IT IS NOT WORKS
     */
    app.useGlobalPipes(new ValidationPipe({
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
    }));
	
	// Start microservice
    await app.startAllMicroservicesAsync();
}
bootstrap();
