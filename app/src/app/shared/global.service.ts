import {Injectable} from '@angular/core';
import {Plugins} from '@capacitor/core';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {
    public token = 'test_token22';
    public apiHost = 'http://jothapunkt.de/zeiterfassung/';
    public port = '';
    public blocks = [];
    public recycleBlocks = [];
    public selectedBlocks = [];

    public invoiceTemplatePath = './assets/templates/invoice';
    public currentProject: any = null;
    public projects: any[] = null;
    projectCodes: any[] = [];

    getBlock(blockID: any) {
        let result = null;
        this.blocks.forEach((block) => {
            if (block.id === blockID) {
                result = block;
            }
        });
        this.recycleBlocks.forEach((block) => {
            if (block.id === blockID) {
                result = block;
            }
        });
        return result;
    }
}

