import { NgModule } from '@angular/core';
import { ProjectsQuery } from './projects.query';
import { ProjectsService } from './projects.service';
import { ProjectsStore } from './projects.store';

@NgModule({
  providers: [ProjectsService, ProjectsQuery, ProjectsStore],
})
export class DataAccessProjectsModule {}
