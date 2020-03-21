import {Injectable} from '@angular/core';
import {Plugins} from '@capacitor/core';
import {RequestService} from './request.service';
import {GlobalService} from './global.service';
import {LoggerService} from "./logger.service";

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
        builder.addParam('token', this.globalService.token);
        builder.get().subscribe( (result: any) => {
            if (result.success) {
                this.globalService.blocks = result.result;
            } else {
                this.logger.error(result.error, 'blocksLoadError');
            }
            callback();
        });
    }
}

