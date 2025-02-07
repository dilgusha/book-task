import { IsNumber, IsString, IsUUID, IsPositive } from "class-validator";

export class PaymentDto {
    @IsUUID()
    orderId: string;

    @IsNumber()
    @IsPositive()
    amount: number;

    @IsString()
    transactionId: string;
}
