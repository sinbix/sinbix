import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ui-post-dialogs-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostDialogsDeleteComponent implements OnInit {
  @Output() saveEvent = new EventEmitter();

  @Input() isLoading: boolean;

  constructor() {}

  ngOnInit(): void {}

  onSave() {
    this.saveEvent.emit();
  }
}
