// type BookDtoType = {
//     title: string;
//     price: string;
//     stock: number;
//     soldCount: number;
// };

// implements BookDtoType 

import { IsNotEmpty, IsString, IsNumber, Min, IsArray, ArrayNotEmpty } from "class-validator";

export class BookDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    price: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    stock: number;


    @IsArray()
    @ArrayNotEmpty()
    authorIds: number[];
    // @IsNotEmpty()
    // @IsNumber()
    // @Min(0)
    // soldCount: number;
}