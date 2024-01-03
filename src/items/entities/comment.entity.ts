import { AbstractEntity } from "src/database/abstract.entity";
import { Column, ManyToOne, Entity } from "typeorm";
import { Item } from "./item.entity";

@Entity()
export class Comment extends AbstractEntity<Comment> {
  @Column()
  content: string;

  @ManyToOne(() => Item, (item) => item.comments)
  item: Item;
}
