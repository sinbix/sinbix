import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { RouterModule } from '@angular/router';
import { BLOG_ROUTES } from './blog.routes';

@NgModule({
  declarations: [BlogComponent],
  imports: [RouterModule.forChild(BLOG_ROUTES), CommonModule],
})
export class BlogModule {}
