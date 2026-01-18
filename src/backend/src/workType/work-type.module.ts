import { Module } from '@nestjs/common';
import {DataManagerModule} from "../data-manager/data-manager.module";
import {WorkTypeController} from "./work-type.controller";

@Module({
  imports: [DataManagerModule],
  controllers: [WorkTypeController],
})
export class WorkTypeModule {}
