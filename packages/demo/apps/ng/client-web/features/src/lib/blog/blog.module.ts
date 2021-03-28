import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { RouterModule } from '@angular/router';
import { BLOG_ROUTES } from './blog.routes';
import { ItemComponent } from './ui/post/item/item.component';
import { ListComponent } from './ui/post/list/list.component';

@NgModule({
  declarations: [BlogComponent, ItemComponent, ListComponent],
  imports: [RouterModule.forChild(BLOG_ROUTES), CommonModule],
})
export class BlogModule {}
