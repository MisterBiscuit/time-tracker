import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class CreateTimeEntryDto {
  @ApiProperty()
  @IsString()
  date: string;

  @ApiProperty()
  @IsString()
  projectId: string;

  @ApiProperty()
  @IsString()
  workTypeId: string;

  @ApiProperty()
  @IsNumber()
  minutes: number;

  @ApiProperty()
  @IsString()
  comment?: string;
}
