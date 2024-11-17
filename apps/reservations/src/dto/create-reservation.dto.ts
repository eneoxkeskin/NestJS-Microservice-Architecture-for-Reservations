import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { Type } from "class-transformer";

export class CreateReservationDto {
    @IsDate()
    @Type(() => Date) // Tarih doğrulaması için transformer
    startDate: Date;

    @IsDate()
    @Type(() => Date)
    endDate: Date;

    @IsString()
    @IsNotEmpty() // Boş olmama kontrolü
    placeId: string;

    @IsString()
    @IsNotEmpty()
    invoiceId: string;
}
