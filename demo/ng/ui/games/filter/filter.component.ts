import * as _ from 'lodash';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ID } from '@datorama/akita';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IGameCategory, IGameMerchant } from '@sinbix/demo/shared/utils/game';
import { IGamesFilter } from '@sinbix/demo/ng/utils/games';
import { Debounce } from '@sinbix-common/utils';

@Component({
  selector: 'ui-games-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GamesFilterComponent implements OnInit, OnDestroy {
  @Input() categories: IGameCategory[];
  @Input() merchants: IGameMerchant[];

  @Input() search = '';
  @Input() selectedCategories: number[] = [];
  @Input() selectedMerchants: number[] = [];

  @Output() changeEvent: EventEmitter<IGamesFilter> = new EventEmitter();

  categoriesSelectText: string;

  formGroup: FormGroup;

  get isNotEmpty() {
    return (
      this.search ||
      this.selectedCategories?.length ||
      this.selectedMerchants?.length
    );
  }

  private formBuilder: FormBuilder = new FormBuilder();
  private unsubscribeAll = new Subject();

  constructor() {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      search: [this.search],
      categories: [this.selectedCategories],
      merchants: [this.selectedMerchants],
    });

    this.formGroup.valueChanges
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((values) => {
        this.setCategoriesSelectText(values['categories']);
        this.changeEventEmit(values);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  getCategoryNameById(id: ID) {
    return this.categories.find((category) => {
      return category.id === id;
    })?.name;
  }

  private setCategoriesSelectText(categories: ID[]) {
    let text: string[] = [];
    for (let i = 0; i < categories?.length; i++) {
      if (categories[i] !== -1) {
        text.push(this.getCategoryNameById(categories[i]));
      } else {
        text.push('Favorite');
      }
    }

    this.categoriesSelectText = _.join(text, ', ');
  }

  @Debounce(1000)
  private changeEventEmit(filters: IGamesFilter) {
    this.changeEvent.emit(filters);
  }
}
