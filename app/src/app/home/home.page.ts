import { Component } from '@angular/core';
import {BlocksService} from '../shared/blocks.service';
import {GlobalService} from '../shared/global.service';
import {RequestService} from '../shared/request.service';
import {LoggerService} from '../shared/logger.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private blocksService: BlocksService,
              private globalService: GlobalService,
              private requestsService: RequestService,
              private logger: LoggerService
  ) {}

  ionViewDidEnter() {
    this.refresh();
    this.globalService.selectedBlocks = [];
  }

  public refresh() {
    this.blocksService.loadBlocks();
  }

  public doRefresh(event) {
    this.blocksService.loadBlocks(() => {
      event.target.complete();
    });
  }

  public delete(id) {
    const builder = this.requestsService.getRequestBuilder();
    builder.setHost(this.globalService.apiHost)
        .setPath('/recycle/')
        .addParam('id', id)
        .get()
        .subscribe((result: any) => {
          if (typeof result === 'undefined') {
            this.logger.error('No HTTP results', 'deleteRequestFailed');
            return;
          }

          this.logger.log(result.result, this.logger.INFO, 'deleteResults');
          this.refresh();
        });
  }

  public isSelected(id) {
    return this.globalService.selectedBlocks.indexOf(id) !== -1;
  }

  public select(id) {
    if (!this.isSelected(id)) {
      this.globalService.selectedBlocks.push(id);
    }
  }

  public unselect(id) {
    if (this.isSelected(id)) {
      this.globalService.selectedBlocks.splice(this.globalService.selectedBlocks.indexOf(id));
    }
  }

  public toggleSelect(id) {
    if (this.isSelected(id)) {
      this.unselect(id);
    } else {
      this.select(id);
    }
  }
}
