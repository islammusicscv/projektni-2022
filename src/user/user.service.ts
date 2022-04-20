import { Injectable } from '@nestjs/common';
import {Repository} from "typeorm";
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {
    }

    create(data): Promise<User> {
        return this.userRepository.save(data);
    }

    all(): Promise<User[]> {
        return this.userRepository.find();
    }

    findOne(id:number) : Promise<User> {
        return this.userRepository.findOne({id});
    }

    findOneByEmail(email:string) : Promise<User> {
        return this.userRepository.findOne({email});
    }

    delete(id:number) {
        return this.userRepository.delete({id});
    }

    async update(id:number,data): Promise<User> {
        await this.userRepository.update(id,data);

        return this.userRepository.findOne({id});
    }
}
