import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    console.log('Register endpoint hit with data:', registerUserDto);
    const result = await this.userService.register(registerUserDto);
    console.log('Register result:', result);
    return result;
  }
}
