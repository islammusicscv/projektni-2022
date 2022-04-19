import {BadRequestException, Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {RegisterDto} from "./register.dto";
import {UserService} from "./user.service";
import {UserUpdateDto} from "./user-update.dto";
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Get('me')
    profile() {
        return "Islam Mušić";
    }

    @Post()
    async create(@Body() data:RegisterDto) {
        if (data.password !== data.password_confirm) {
            throw new BadRequestException('Gesli se ne ujemata');
        }

        const hashed = await bcrypt.hash(data.password,12);

        return this.userService.create({
            "first_name":data.first_name,
            "last_name":data.last_name,
            "email":data.email,
            "password":hashed
        });
    }

    @Get('all')
    all() {
        return this.userService.all();
    }

    @Get(':id')
    findOne(@Param('id') id:number) {
        return this.userService.findOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id:number) {
        return this.userService.delete(id);
    }

    @Put(':id')
    async update(@Param('id') id:number,
           @Body() data:UserUpdateDto) {
        return await this.userService.update(id, data);
    }



}
