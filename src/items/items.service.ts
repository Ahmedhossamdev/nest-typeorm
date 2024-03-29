import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { EntityManager, Repository } from "typeorm";
import { Item } from "./entities/item.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Comment } from "./entities/comment.entity";
import { Tag } from "./entities/tag.entity";

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createItemDto: CreateItemDto) {
    // const item = new Item(createItemDto);
    // await this.entityManager.save(item);

    const item = this.itemsRepository.create(createItemDto);

    await this.itemsRepository.save(item);
    return { data: item };
  }

  async findAll() {
    return this.itemsRepository.find();
  }

  async findOne(id: number) {
    return this.itemsRepository.findOne({
      where: {
        id,
      },
      relations: { listing: true, comments: true, tags: true },
    });
  }

  // 1
  // const item = await this.itemsRepository.findOneBy({ id });
  // item.public = updateItemDto.public;
  // this.itemsRepository.save(item);

  // 2
  // Note!! Preload need id
  // return this.itemsRepository.preload(updateItemDto);

  /*
     1- loop in the comments
     2- validate every comment using createCommentDto // we can use nestedValidate
     3- if you are not using nested validate? you will do it like this..

      const comments = updateItemDto.comments.map(
        (createCommentDto) => this.commentsRepository.create(createCommentDto),
      );

    */
  // old code need to be reviewd
  // const comments = updateItemDto.comments.map((comment) =>
  //   this.commentsRepository.create(comment),
  // );

  // await this.commentsRepository.save(comments);

  // console.log(comments);

  // delete updateItemDto.comments;

  // const item = await this.itemsRepository.update(id, {
  //   ...updateItemDto,
  // });

  // Recommended way
  // async update(id: number, updateItemDto: UpdateItemDto) {
  //   await this.entityManager.transaction(async () => {
  //     const { comments, ...updateData } = updateItemDto;
  //     // find the item
  //     const item = await this.itemsRepository.findOne(id);
  //     if (!item) {
  //       throw new NotFoundException(`Item #${id} not found`);
  //     }

  //     // update the item's properties
  //     Object.assign(item, updateData);

  //     const tagContent = `${Math.random()}`;

  //     // create and save the new tag
  //     const newTag = await this.tagsRepository.save({ content: tagContent });

  //     // associate the new tag with the item
  //     if (!Array.isArray(item.tags)) {
  //       item.tags = [newTag];
  //     } else {
  //       item.tags.push(newTag);
  //     }

  //     // save the item with the new tag
  //     await this.itemsRepository.save(item);

  //     // if there are comments, create them
  //     if (comments) {
  //       const createdComments = comments.map((comment) =>
  //         this.commentsRepository.create({ ...comment, item }),
  //       );

  //       // save the comments
  //       await this.commentsRepository.save(createdComments);
  //     }

  //     return item;
  //   });
  // }

  async update(id: number, updateItemDto: UpdateItemDto) {
    await this.entityManager.transaction(async () => {
      const { comments, ...updateData } = updateItemDto;
      // update the item
      const item = await this.itemsRepository.preload({ id, ...updateData });
      if (!item) {
        throw new NotFoundException(`Item #${id} not found`);
      }

      const tagContent = `${Math.random()}`;

      const newTag = await this.tagsRepository.save({
        content: tagContent,
      });

      if (!item.tags) {
        item.tags = [newTag];
      } else {
        item.tags.push(newTag);
      }

      await this.itemsRepository.save(item);

      // if there are comments, create them
      if (comments) {
        const createdComments = comments.map((comment) =>
          this.commentsRepository.create({ ...comment, item }),
        );

        await this.commentsRepository.save(createdComments);
      }
      return item;
    });
  }

  async remove(id: number) {
    return await this.itemsRepository.delete(id);
  }
}
