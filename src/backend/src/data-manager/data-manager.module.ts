import {Module} from '@nestjs/common';
import {DataManager} from "./data.manager";

@Module({
  imports: [],
  providers: [DataManager],
  exports: [DataManager],
})
export class DataManagerModule {
}
