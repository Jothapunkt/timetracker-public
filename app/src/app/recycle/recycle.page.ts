import { Component, OnInit } from '@angular/core';
import {BlocksService} from '../shared/blocks.service';
import {GlobalService} from '../shared/global.service';
import {RequestService} from '../shared/request.service';
import {LoggerService} from '../shared/logger.service';

@Component({
  selector: 'app-recycle',
  templateUrl: './recycle.page.html',
  styleUrls: ['./recycle.page.scss'],
})
export class RecyclePage {

  constructor(private blocksService: BlocksService,
              private globalService: GlobalService,
              private requestsService: RequestService,
              private logger: LoggerService
  ) {}

  ionViewDidEnter() {
    this.refresh();
  }

  public refresh() {
    this.blocksService.loadRecycleBlocks();
  }

  public doRefresh(event) {
    this.blocksService.loadRecycleBlocks(() => {
      event.target.complete();
    });
  }

  public restore(id) {
    const builder = this.requestsService.getRequestBuilder();
    builder.setHost(this.globalService.apiHost)
        .setPath('/restore/')
        .addParam('id', id)
        .addParam('code', this.globalService.currentProject.code)
        .get()
        .subscribe((result: any) => {
          if (typeof result === 'undefined') {
            this.logger.error('No HTTP results', 'restoreRequestFailed');
            return;
          }

          this.logger.log(result.result, this.logger.INFO, 'restoreResults');
          this.refresh();
        });
  }

}
