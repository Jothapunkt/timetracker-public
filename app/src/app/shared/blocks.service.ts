import {Injectable} from '@angular/core';
import {Plugins} from '@capacitor/core';
import {RequestService} from './request.service';
import {GlobalService} from './global.service';
import {LoggerService} from './logger.service';

@Injectable({
    providedIn: 'root'
})
export class BlocksService {
    constructor(private requestsService: RequestService,
                private globalService: GlobalService,
                private logger: LoggerService) {
    }

    public loadBlocks(callback = () => {}) {
        const builder = this.requestsService.getRequestBuilder();
        builder.setPath('get/index.php');
        builder.setHost(this.globalService.apiHost);
        builder.addParam('code', this.globalService.currentProject.code);
        builder.get().subscribe( (result: any) => {
            if (result.success) {
                this.globalService.blocks = result.result;
                this.correctAllBlocks();
            } else {
                this.logger.error(result.error, 'blocksLoadError');
            }
            callback();
        });
    }

    public loadRecycleBlocks(callback = () => {}) {
        const builder = this.requestsService.getRequestBuilder();
        builder.setPath('recycle_bin/index.php');
        builder.setHost(this.globalService.apiHost);
        builder.addParam('code', this.globalService.currentProject.code);
        builder.get().subscribe( (result: any) => {
            if (result.success) {
                this.globalService.recycleBlocks = result.result;
                this.correctAllBlocks();
            } else {
                this.logger.error(result.error, 'recycleBlocksLoadError');
            }
            callback();
        });
    }

    public correctBlockUnits(block: any) {
        block.id = Number(block.id);
        block.duration = Number(block.duration);
        block.timestamp = new Date(block.year, block.month - 1, block.day).getTime();
    }

    public correctAllBlocks() {
        this.globalService.blocks.forEach((block) => {
            this.correctBlockUnits(block);
        });
        this.globalService.recycleBlocks.forEach((block) => {
            this.correctBlockUnits(block);
        });
    }
}



