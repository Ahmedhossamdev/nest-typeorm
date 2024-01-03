import { Exclude } from "class-transformer";
import { IsOptional, IsInt, Min } from "class-validator";

export abstract class GeneralDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  id?: number;

  @Exclude()
  updatedAt?: Date;

  @Exclude()
  createdAt?: Date;

  @Exclude()
  deletedAt?: Date;

  @Exclude()
  createdBy?: string;

  @Exclude()
  updatedBy?: string;

  @Exclude()
  deletedBy?: string;
}
