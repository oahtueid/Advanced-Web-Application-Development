import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerUserDto: RegisterUserDto) {
    console.log('Register endpoint hit with data:', registerUserDto);
    const result = await this.userService.register(registerUserDto);
    console.log('Register result:', result);
    
    // Ensure we always return an object
    if (!result) {
      throw new Error('Registration failed - no result returned');
    }
    
    return result;
  }
}
