import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SxFormBuilder, SxFormStore } from '@sinbix-angular/common/form';
import { validator } from '@sinbix-common/validator';
import { CONTENT_VALIDATOR, IPost, TITLE_VALIDATOR } from '@sinbix/demo/shared/utils/post';
import { PostDialogFormData } from './utils';

@Component({
  selector: 'ui-post-dialogs-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostDialogsFormComponent implements OnInit {
  @Output() saveEvent = new EventEmitter<Partial<IPost>>();

  @Input() isLoading: boolean;

  formStore: SxFormStore;

  constructor(
    public dialogRef: MatDialogRef<PostDialogsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PostDialogFormData,
    private formBuilder: SxFormBuilder
  ) {}

  ngOnInit(): void {
    this.formStore = this.formBuilder.store({
      title: [this.data.post?.title ?? '', TITLE_VALIDATOR.required()],
      content: [this.data.post?.content ?? '', CONTENT_VALIDATOR.required()],
    });
  }

  onSave() {
    if (this.formStore.form.valid) {
      this.saveEvent.emit({
        ...(this.data.post ?? {}),
        ...this.formStore.getValues(),
      });
    }
  }
}
