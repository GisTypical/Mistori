import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  update: {'id': string, 'text': string}
  delete: string

  constructor(private popOverController: PopoverController) { }

  ngOnInit() {}

  onUpdate() {
    this.ClosePopover(this.update)
  }

  onDelete() {
    this.ClosePopover(this.delete)
  }

  ClosePopover(result: { 'id': string, 'text': string } | string) {
    this.popOverController.dismiss(result)
  }

}
