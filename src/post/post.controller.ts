import {Body, Controller, Post, Req, UseGuards} from '@nestjs/common';
import {PostService} from "./post.service";
import {JwtService} from "@nestjs/jwt";
import {AuthGuard} from "../auth/auth.guard";
import {CreatePostDto} from "./create-post.dto";
import {Request} from "express";

@Controller('post')
export class PostController {
    constructor(
        private postService: PostService,
        private jwtService: JwtService
    ) {
    }

    @UseGuards(AuthGuard)
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
}
