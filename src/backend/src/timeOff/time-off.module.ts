import { Module } from '@nestjs/common';
import {HttpModule} from '@nestjs/axios';
import {TimeOffController} from "./time-off.controller";
import {DataManagerModule} from "../data-manager/data-manager.module";

@Module({
  imports: [HttpModule, DataManagerModule],
  controllers: [TimeOffController],
})
export class TimeOffModule {}
