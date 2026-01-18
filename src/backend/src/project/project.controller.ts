import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  ValidationPipe
} from "@nestjs/common";
import {AppState, Project} from "../interfaces";
import {DataManager} from "../data-manager/data.manager";
import {CreateProjectDto} from "./dtos/create-project.dto";
import {UpdateProjectDto} from "./dtos/update-project.dto";

@Controller('projects')
export class ProjectController {
  constructor(private readonly dataManager: DataManager) {
  }

  @Get()
  public async findAll(): Promise<Project[]> {
    const data = await this.dataManager.get();
    return data.projects;
  }

  @Post()
  public async create(@Body(ValidationPipe) itemData: CreateProjectDto): Promise<Project> {
    const data: AppState = await this.dataManager.get();
    const newProject: Project = {
      ...itemData,
      id: crypto.randomUUID(),
    };
    data.projects = [...data.projects, newProject];
    await this.dataManager.set(data);
    return newProject;
  }

  @Put(':id')
  public async update(@Param('id') id: string, @Body(ValidationPipe) itemData: UpdateProjectDto): Promise<Project> {
    const data: AppState = await this.dataManager.get();
    const item: Project | undefined = data.projects.find(p => p.id === id);
    if (!item) {
      throw new NotFoundException();
    }
    const updatedItem: Project = {...item, ...itemData};
    data.projects = data.projects.map(p => p.id === id ? updatedItem : p);
    await this.dataManager.set(data);
    return updatedItem;
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<void> {
    const data: AppState = await this.dataManager.get();
    console.log(id);
    const item: Project | undefined = data.projects.find(p => p.id === id);
    console.log('item', item);
    if (!item) {
      throw new NotFoundException();
    }
    data.projects = data.projects.filter(p => p.id !== item.id);
    await this.dataManager.set(data);
  }
}
