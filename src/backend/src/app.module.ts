import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ProjectModule} from "./project/project.module";
import {WorkTypeModule} from "./workType/work-type.module";
import {TimeEntryModule} from "./timeEntry/time-entry.module";
import {TimeOffModule} from "./timeOff/time-off.module";

@Module({
  imports: [ProjectModule, WorkTypeModule, TimeEntryModule, TimeOffModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
