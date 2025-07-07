import { IsString } from "class-validator";

export class categoryDTO
{
    @IsString()
    title:string
}