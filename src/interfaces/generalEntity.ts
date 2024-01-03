import { IsDate, IsInt, IsString } from "class-validator";
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from "typeorm";

export default abstract class GeneralEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  @IsInt()
  id: number;

  @UpdateDateColumn({})
  @IsDate()
  updatedAt?: Date;

  @CreateDateColumn({})
  @IsDate()
  createdAt?: Date;

  @DeleteDateColumn({})
  @IsDate()
  deletedAt?: Date;

  @ManyToOne("User")
  @JoinColumn({ name: "createdBy", referencedColumnName: "username" })
  @Index()
  @IsString()
  createdBy?: string;

  @ManyToOne("User")
  @JoinColumn({ name: "updatedBy", referencedColumnName: "username" })
  @IsString()
  updatedBy?: string;

  @ManyToOne("User")
  @JoinColumn({ name: "deletedBy", referencedColumnName: "username" })
  @IsString()
  deletedBy?: string;
}
