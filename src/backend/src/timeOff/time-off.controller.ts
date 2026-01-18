import {Body, Controller, Delete, Get, NotFoundException, Post, Put, Query, ValidationPipe} from "@nestjs/common";
import {AppState, TimeOff} from "../interfaces";
import {DataManager} from "../data-manager/data.manager";
import {CreateTimeOffDto} from "./dtos/create-time-off.dto";
import {UpdateTimeOffDto} from "./dtos/update-time-off.dto";

@Controller('time-off')
export class TimeOffController {
  constructor(private readonly dataManager: DataManager) {
  }

  @Get()
  public async findAll(): Promise<TimeOff[]> {
    const data = await this.dataManager.get();
    return data.timeOff;
  }

  @Post()
  public async create(@Body(ValidationPipe) itemData: CreateTimeOffDto): Promise<TimeOff> {
    const data: AppState = await this.dataManager.get();
    const newTimeOff: TimeOff = {
      ...itemData,
      id: crypto.randomUUID(),
    };
    data.timeOff = [...data.timeOff, newTimeOff];
    await this.dataManager.set(data);
    return newTimeOff;
  }

  @Put(':id')
  public async update(@Query('id') id: string, @Body() itemData: UpdateTimeOffDto): Promise<TimeOff> {
    const data: AppState = await this.dataManager.get();
    const item: TimeOff | undefined = data.timeOff.find(p => p.id === id);
    if (!item) {
      throw new NotFoundException();
    }
    const updatedItem: TimeOff = {...item, ...itemData};
    data.timeOff = data.timeOff.map(p => p.id === id ? updatedItem : p);
    await this.dataManager.set(data);
    return updatedItem;
  }

  @Delete(':id')
  public async remove(@Query('id') id: string): Promise<void> {
    const data: AppState = await this.dataManager.get();
    const item: TimeOff | undefined = data.timeOff.find(p => p.id === id);
    if (!item) {
      throw new NotFoundException();
    }
    data.timeOff = data.timeOff.filter(p => p.id !== item.id);
    await this.dataManager.set(data);
  }
}
