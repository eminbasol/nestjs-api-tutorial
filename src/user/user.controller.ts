import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';




@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}


/* @UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  // @desc    Get user info
  // @route   GET /users/me
  // @access  Private
  // everytime instead of writing this @UseGuards(AuthGuard('jwt')) we can use jwtGuard class
  //@UseGuards(AuthGuard('jwt'))
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: User , //----@GetUser('email') email: string---//) {
    //console.log({user: req.user,});
    // OUTPUT : { user: {sub: 4,email: 'test2@gmail.com',iat: 1696212392,exp: 1696213292}}

    return user;
  }

  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
} */