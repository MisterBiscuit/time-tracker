import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, ValidationPipe} from "@nestjs/common";
import {AppState, TimeEntry} from "../interfaces";
import {DataManager} from "../data-manager/data.manager";
import {CreateTimeEntryDto} from "./dtos/create-time-entry.dto";
import {UpdateTimeEntryDto} from "./dtos/update-time-entry.dto";

@Controller('time-entries')
export class TimeEntryController {
  constructor(private readonly dataManager: DataManager) {
  }

  @Get()
  public async findAll(): Promise<TimeEntry[]> {
    const data = await this.dataManager.get();
    return data.entries;
  }

  @Post()
  public async create(@Body(ValidationPipe) itemData: CreateTimeEntryDto): Promise<TimeEntry> {
    const data: AppState = await this.dataManager.get();
    const newTimeEntry: TimeEntry = {
      ...itemData,
      id: crypto.randomUUID(),
    };
    data.entries = [...data.entries, newTimeEntry];
    await this.dataManager.set(data);
    return newTimeEntry;
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() itemData: UpdateTimeEntryDto): Promise<TimeEntry> {
    const data: AppState = await this.dataManager.get();
    const item: TimeEntry | undefined = data.entries.find(p => p.id === id);
    if (!item) {
      throw new NotFoundException();
    }
    const updatedItem: TimeEntry = {...item, ...itemData};
    data.entries = data.entries.map(p => p.id === id ? updatedItem : p);
    await this.dataManager.set(data);
    return updatedItem;
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<void> {
    const data: AppState = await this.dataManager.get();
    const item: TimeEntry | undefined = data.entries.find(p => p.id === id);
    if (!item) {
      throw new NotFoundException();
    }
    data.entries = data.entries.filter(p => p.id !== item.id);
    await this.dataManager.set(data);
  }
}
