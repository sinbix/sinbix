import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ui-games-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GamesStepperComponent implements OnInit {
  @Input() step = 0;

  @Output() stepEvent: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  up() {
    this.updateStep(this.step + 1);
  }

  down(event: MouseEvent) {
    event.preventDefault();
    this.updateStep(this.step - 1);
  }

  updateStep(step: number) {
    this.step = step;
    this.stepEvent.emit(step);
  }
}
