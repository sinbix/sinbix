import * as _ from 'lodash';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'smat-nav-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavLinkComponent implements OnInit {
  @ViewChild('ref') linkElRef: ElementRef;

  @Input() url: string;
  @Input() externalUrl: boolean;
  @Input() openInNewTab: boolean;
  @Input() exactMatch: boolean;
  @Input() function: any;

  active = 'link-active';

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  @HostListener('mouseenter')
  mouseenter() {
    this.renderer.addClass(this.linkElRef.nativeElement, 'link-hover');
  }

  @HostListener('mouseleave')
  mouseleave() {
    this.renderer.removeClass(this.linkElRef.nativeElement, 'link-hover');
  }
}
