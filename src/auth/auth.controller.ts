import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('login')
    loginUser(@Body() LoginDTO: LoginDTO) {
        return this.authService.login(LoginDTO);
    }

}
