import {IsEmail, MinLength} from "class-validator";

export class UserUpdateDto {
    first_name?: string;

    last_name?: string;

    email?: string;

    password?: string;
}