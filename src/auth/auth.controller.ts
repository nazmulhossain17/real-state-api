import { Body, Controller, Get, Param, Patch, Post, Delete } from "@nestjs/common";
import { AuthService } from './auth.service';
import { AuthDto } from "./dto";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @Post('signup')
    signup(@Body() dto: AuthDto){
        console.log({dto});
        return this.authService.signup(dto)
    }

    @Post('signin')
    signin(@Body() dto: AuthDto){
        return this.authService.signin(dto)
    }

    @Get(":id")
  getUserById(@Param("id") id: string) {
    return this.authService.getUserById(id);
  }

  @Patch(":id")
  updateUser(@Param("id") id: string, @Body() dto: Partial<AuthDto>) {
    return this.authService.updateUser(id, dto);
  }

  @Delete(":id")
  deleteUser(@Param("id") id: string) {
    return this.authService.deleteUser(id);
  }
}