import { Module } from '@nestjs/common';
import {ProjectController} from "./project.controller";
import {DataManagerModule} from "../data-manager/data-manager.module";

@Module({
    imports: [DataManagerModule],
    controllers: [ProjectController],
})
export class ProjectModule {}
