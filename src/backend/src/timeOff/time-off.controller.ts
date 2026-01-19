import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, ValidationPipe} from "@nestjs/common";
import {HttpService} from '@nestjs/axios';
import {firstValueFrom} from "rxjs";

import {AppState, TimeOff} from "../interfaces";
import {DataManager} from "../data-manager/data.manager";
import {CreateTimeOffDto} from "./dtos/create-time-off.dto";
import {UpdateTimeOffDto} from "./dtos/update-time-off.dto";
import {AxiosResponse} from "axios";

@Controller('time-off')
export class TimeOffController {
  constructor(private readonly dataManager: DataManager, private readonly httpService: HttpService) {
  }

  @Get()
  public async findAll(): Promise<TimeOff[]> {
    const data = await this.dataManager.get();
    return data.timeOff;
  }

  @Post('autofill')
  public async autofill(): Promise<void> {
    // Get the holiday data from the third-party API
    const year = new Date().getFullYear();
    const axiosResponse: AxiosResponse = await firstValueFrom(this.httpService.get(`https://date.nager.at/api/v3/PublicHolidays/${year}/FR`));
    const newTimeOff: TimeOff[] = axiosResponse.data.map(holiday => ({
      id: crypto.randomUUID(),
      date: holiday.date,
      label: holiday.localName,
    }));

    // Load the current holiday data
    const data = await this.dataManager.get();

    // Build the new list: start with the retrieved holidays and add any existing that are on different dates
    const userDefined: TimeOff[] = data.timeOff.filter((timeOff: TimeOff) => !newTimeOff.find(n => n.date === timeOff.date));
    data.timeOff = [
      ...newTimeOff,
      ...userDefined,
    ];
    data.timeOff.sort((a, b) => a.date.localeCompare(b.date));

    await this.dataManager.set(data);
  }

  @Post()
  public async create(@Body(ValidationPipe) itemData: CreateTimeOffDto): Promise<TimeOff> {
    const data: AppState = await this.dataManager.get();
    const newTimeOff: TimeOff = {
      ...itemData,
      id: crypto.randomUUID(),
    };
    data.timeOff = [...data.timeOff, newTimeOff];
    data.timeOff.sort((a, b) => a.date.localeCompare(b.date));
    await this.dataManager.set(data);
    return newTimeOff;
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body() itemData: UpdateTimeOffDto): Promise<TimeOff> {
    const data: AppState = await this.dataManager.get();
    const item: TimeOff | undefined = data.timeOff.find(p => p.id === id);
    if (!item) {
      throw new NotFoundException();
    }
    const updatedItem: TimeOff = {...item, ...itemData};
    data.timeOff = data.timeOff.map(p => p.id === id ? updatedItem : p);
    data.timeOff.sort((a, b) => a.date.localeCompare(b.date));
    await this.dataManager.set(data);
    return updatedItem;
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<void> {
    const data: AppState = await this.dataManager.get();
    const item: TimeOff | undefined = data.timeOff.find(entry => entry.id === id);
    if (!item) {
      throw new NotFoundException();
    }
    data.timeOff = data.timeOff.filter(entry => entry.id !== item.id);
    await this.dataManager.set(data);
  }
}
