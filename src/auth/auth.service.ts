import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PersonsService } from 'src/persons/persons.service';
import { LoginDTO } from './dto/auth.dto';
import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private personService: PersonsService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async login(loginDTO: LoginDTO) {
        const { email, password } = loginDTO;
        const findUser = await this.personService.getOne({ email });
        if (!findUser) throw new HttpException('User found', 404);

        const validPassword = await compare(password, findUser.password);

        if (!validPassword) throw new HttpException('FORBIDDEN', 403)

        const payload = {
            id: findUser._id,
            name: findUser.name
        }

        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_ACESSEC_SECRET'),
            expiresIn: this.configService.get(`${'JWT_ACESSEC_TIME'}`)
        })

        return { token };

    }
}
