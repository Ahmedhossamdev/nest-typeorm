import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Listing } from "./listing.entity";
import { AbstractEntity } from "src/database/abstract.entity";
import { Comment } from "./comment.entity";

@Entity()
export class Item extends AbstractEntity<Item> {
  @Column()
  name: string;

  @Column({ default: true })
  public: boolean;

  // Hint!!
  // We use JoinColumn to specify that we are the owner of this relation.
  // so listingId will be forgien key in item table.
  @OneToOne(() => Listing, { cascade: true })
  @JoinColumn()
  listing: Listing;

  @OneToMany(() => Comment, (comment) => comment.item, { cascade: true })
  comments: Comment[];

  // Why we get out of the constractor?
  // constructor(item: Partial<Item>) {
  //   Object.assign(this, item);
  // }
}
