import { Module } from '@nestjs/common';
import {TimeOffController} from "./time-off.controller";
import {DataManagerModule} from "../data-manager/data-manager.module";

@Module({
  imports: [DataManagerModule],
  controllers: [TimeOffController],
})
export class TimeOffModule {}
