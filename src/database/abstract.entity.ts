import { PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { IsInt } from "class-validator";

export class AbstractEntity<T> {
  @PrimaryGeneratedColumn()
  @IsInt()
  id: number;

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
