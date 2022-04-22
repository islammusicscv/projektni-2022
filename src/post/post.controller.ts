import {
    BadRequestException,
    Body, ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    UnauthorizedException,
    UseGuards, UseInterceptors
} from '@nestjs/common';
import {PostService} from "./post.service";
import {JwtService} from "@nestjs/jwt";
import {AuthGuard} from "../auth/auth.guard";
import {CreatePostDto} from "./create-post.dto";
import {Request} from "express";

@UseGuards(AuthGuard)
//@UseInterceptors(ClassSerializerInterceptor)
@Controller('post')
export class PostController {
    constructor(
        private postService: PostService,
        private jwtService: JwtService
    ) {
    }

    @Post()
    async create (@Body() data: CreatePostDto,
            @Req() req : Request) {

        const jwt = req.cookies['jwt'];
        const user = await this.jwtService.verifyAsync(jwt);

        return this.postService.create({
           content: data.content,
           user: {
               id: user.id
           }
        });
    }

    @Get()
    all() {
        return this.postService.all();
    }

    @Get(':id')
    getOne (@Param('id') id: number) {
        return this.postService.findOne(id);
    }

    @Delete(':id')
    delete (@Param('id') id: number) {
        return this.postService.delete(id);
    }

    @Put(':id')
    async update (
        @Param('id') id: number,
        @Body() data: CreatePostDto,
        @Req() req: Request
    ) {
        const jwt = req.cookies['jwt'];
        const user = await this.jwtService.verifyAsync(jwt);

        const post = await this.postService.findOne(id);
        //preverim, če je lastnik
        if (post.user.id != user.id) {
            throw new UnauthorizedException('Nisi lastnik');
        }

        return this.postService.update(id, data);
    }

}
