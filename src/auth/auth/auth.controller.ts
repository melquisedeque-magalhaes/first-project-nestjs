import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Role } from '../role-permission/role.decorator';
import { RoleGuard } from '../role-permission/role.guard';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';

@Controller()
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('login')
    login(@Body() body) {
        const { username, password } = body

        try {
            const token = this.authService.login({ username, password })

            return { token }
        } catch (err) {

            return { error: err.message }

        }

    }

    @Role('admin')
    @UseGuards(JwtGuard, RoleGuard)
    @Get('/dashboard')
    Dashboard(@Req() request) {

        const { user } = request

        console.log(user)
        return 'dashboard'
    }
}
