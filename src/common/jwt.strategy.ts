import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PayloadDTO } from "../auth/dto/Payload.dto";

export class jwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'privada',
        });
        // console.log(configService.get('JWT_ACESSEC_SECRET'))

    }

    async validate(payload: PayloadDTO) {
        return { id: payload.id, name: payload.name }
    }
}