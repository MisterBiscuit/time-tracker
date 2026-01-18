import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class UpdateProjectDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  colour?: string;
}
