import {Injectable} from '@nestjs/common';
import {access, mkdir, readFile, writeFile} from 'fs/promises';
import {dirname, join} from 'path';
import {AppState} from "../interfaces";
import path from "node:path";

@Injectable()
export class DataManager {
    private readonly filepath = join(process.cwd(), 'data', 'data.json');

    private async ensureFileExists(path: string): Promise<void> {
        try {
            await access(path);
        } catch {
            await mkdir(dirname(path), { recursive: true });
            await writeFile(path, '{"projects": [], "entries": [], "workTypes": [], "timeOff": []}', 'utf-8');
        }
    }

    public async get(): Promise<AppState> {
        await this.ensureFileExists(this.filepath);
        const fileContent: string = await readFile(this.filepath, 'utf-8');
        try {
            return JSON.parse(fileContent) as AppState;
        } catch {
            return Promise.resolve({
                entries: [],
                projects: [],
                timeOff: [],
                workTypes: [],
            });
        }
    }

    public async set(data: AppState): Promise<void> {
        await this.ensureFileExists(this.filepath);
        const content = JSON.stringify(data, null, 2);
        await writeFile(this.filepath, content, 'utf-8');
    }
}
