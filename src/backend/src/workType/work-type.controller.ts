import {Body, Controller, Delete, Get, NotFoundException, Post, Put, Query, ValidationPipe} from "@nestjs/common";
import {AppState, WorkType} from "../interfaces";
import {DataManager} from "../data-manager/data.manager";
import {CreateWorkTypeDto} from "./dtos/create-work-type.dto";
import {UpdateWorkTypeDto} from "./dtos/update-work-type.dto";

@Controller('work-types')
export class WorkTypeController {
  constructor(private readonly dataManager: DataManager) {
  }

  @Get()
  public async findAll(): Promise<WorkType[]> {
    const data = await this.dataManager.get();
    return data.workTypes;
  }

  @Post()
  public async create(@Body(ValidationPipe) itemData: CreateWorkTypeDto): Promise<WorkType> {
    const data: AppState = await this.dataManager.get();
    const newWorkType: WorkType = {
      ...itemData,
      id: crypto.randomUUID(),
    };
    data.workTypes = [...data.workTypes, newWorkType];
    await this.dataManager.set(data);
    return newWorkType;
  }

  @Put(':id')
  public async update(@Query('id') id: string, @Body() itemData: UpdateWorkTypeDto): Promise<WorkType> {
    const data: AppState = await this.dataManager.get();
    const item: WorkType | undefined = data.workTypes.find(p => p.id === id);
    if (!item) {
      throw new NotFoundException();
    }
    const updatedItem: WorkType = {...item, ...itemData};
    data.workTypes = data.workTypes.map(p => p.id === id ? updatedItem : p);
    await this.dataManager.set(data);
    return updatedItem;
  }

  @Delete(':id')
  public async remove(@Query('id') id: string): Promise<void> {
    const data: AppState = await this.dataManager.get();
    const item: WorkType | undefined = data.workTypes.find(p => p.id === id);
    if (!item) {
      throw new NotFoundException();
    }
    data.workTypes = data.workTypes.filter(p => p.id !== item.id);
    await this.dataManager.set(data);
  }
}
