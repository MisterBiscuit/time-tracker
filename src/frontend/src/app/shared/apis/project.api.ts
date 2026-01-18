import {Injectable} from '@angular/core';
import {Project} from '@shared/interfaces';
import {AbstractApi} from '@shared/apis/abstract.api';

@Injectable({ providedIn: 'root' })
export class ProjectApi extends AbstractApi<Project> {

  protected readonly endpoint: string = '/projects';

}
