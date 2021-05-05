import { Type } from "class-transformer";
import { IsDefined, IsIP, IsLatitude, IsLongitude, IsNotEmpty, IsNotEmptyObject, IsString, ValidateNested } from "class-validator";

export class DeviceData {
    @IsNotEmpty()
    @IsString()
    device_name: string;

    @IsNotEmpty()
    device_type: string;

    @IsNotEmpty()
    @IsString()
    device_os: string;

    @IsString()
    device_token: string;

    @IsNotEmpty()
    @IsString()
    app_version: string;

    @IsLatitude()
    latitude: number;

    @IsLongitude()
    longitude: number;
}

export class CreateSessionDto {
    @IsDefined()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => DeviceData)
    device_data: DeviceData;

    language: string;

    @IsIP()
    ip: string;
}

export class CreateSessionResponseDto {
    message: string;

    constructor(msg) {
        this.message = msg;
    }
}
