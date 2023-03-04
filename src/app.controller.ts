import { Controller, Request, Post, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/constants'

/**
 * jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJzdWIiOjEsImlhdCI6MTY3Nzk0Nzk1NSwiZXhwIjoxNjc3OTQ4MDE1fQ.7yUlazOGr5uvBIrZRz7u1zszM2CRCOqxrA44WHdA2BU
 */
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Post('auth/login')
  async login(@Request() req) {
    console.log('request: ', req.body)

    return this.authService.login(req.body);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
