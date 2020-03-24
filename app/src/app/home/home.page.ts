import { Component } from '@angular/core';
import {BlocksService} from '../shared/blocks.service';
import {GlobalService} from '../shared/global.service';
import {RequestService} from '../shared/request.service';
import {LoggerService} from '../shared/logger.service';
import {EditService} from '../shared/edit.service';
import {TemplateService} from '../shared/template.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private blocksService: BlocksService,
              private globalService: GlobalService,
              private requestsService: RequestService,
              private logger: LoggerService,
              private editService: EditService,
              private templateService: TemplateService,
              private router: Router
  ) {}

  ionViewDidEnter() {
    if (this.globalService.currentProject === null) {
      this.router.navigateByUrl('/projects');
      return;
    }
    this.refresh();
    this.globalService.selectedBlocks = [];
  }

  public refresh() {
    this.blocksService.loadBlocks();
    this.globalService.selectedBlocks = [];
  }

  public doRefresh(event) {
    this.blocksService.loadBlocks(() => {
      event.target.complete();
    });
    this.globalService.selectedBlocks = [];
  }

  public delete(id) {
    const builder = this.requestsService.getRequestBuilder();
    builder.setHost(this.globalService.apiHost)
        .setPath('/recycle/')
        .addParam('id', id)
        .addParam('code', this.globalService.currentProject.code)
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

  public setEditBlock(block: any) {
    this.editService.block = block;
    this.editService.initDate();
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
