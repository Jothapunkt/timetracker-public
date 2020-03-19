import { Component } from '@angular/core';
import {BlocksService} from "../shared/blocks.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private blocksService: BlocksService
  ) {}

  public doRefresh(event) {
    this.blocksService.loadBlocks(() => {
      event.target.complete();
    });
  }
}
