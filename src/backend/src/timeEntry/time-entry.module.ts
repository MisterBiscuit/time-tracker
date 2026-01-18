import { Module } from '@nestjs/common';
import {TimeEntryController} from "./time-entry.controller";
import {DataManagerModule} from "../data-manager/data-manager.module";

@Module({
  imports: [DataManagerModule],
  controllers: [TimeEntryController],
})
export class TimeEntryModule {}
