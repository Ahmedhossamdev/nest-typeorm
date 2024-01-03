import { CrateTagrDto } from "./CrateTagDto";
import { CreateListingDto } from "./create-listing.dto";

export class CreateItemDto {
  name: string;
  public: boolean;
  listing: CreateListingDto;
  tags: CrateTagrDto[];
}
