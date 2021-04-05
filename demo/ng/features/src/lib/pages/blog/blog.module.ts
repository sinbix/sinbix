import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  UiMaterialModule,
  UiPostModule,
} from '@sinbix/demo/ng/ui';
import { BLOG_ROUTES } from './blog.routes';
import { BlogComponent } from './blog.component';

@NgModule({
  declarations: [BlogComponent],
  imports: [
    RouterModule.forChild(BLOG_ROUTES),
    CommonModule,
    UiPostModule,
    UiMaterialModule,
  ],
})
export class BlogModule {}
