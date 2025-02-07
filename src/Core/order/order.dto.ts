import { IsEnum, IsNumber } from "class-validator";
import { ESatus } from "../../shared/enum/order.enum";

export class CreateOrderDTO {
    @IsNumber()
    quantity : number;

    @IsNumber()
    totalPrice : number;

    @IsEnum(ESatus)
    status : ESatus;

}