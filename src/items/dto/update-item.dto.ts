import { PartialType } from "@nestjs/mapped-types";
import { CreateItemDto } from "./create-item.dto";
import { CreateCommentDto } from "./create-comment.dto";
import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class UpdateItemDto extends PartialType(CreateItemDto) {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCommentDto)
  comments: CreateCommentDto[];
}
