import {Injectable} from '@angular/core';
import {Plugins} from '@capacitor/core';
import {GlobalService} from './global.service';
import {RequestService} from './request.service';

@Injectable({
    providedIn: 'root'
})
export class TemplateService {
    // tslint:disable-next-line:max-line-length
    public monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    public perHour = 11;
    public lastInvoice = '';

    constructor(private globalService: GlobalService,
                private requestsService: RequestService) {
    }

    public parseInvoice(template = 'invoice') {
        this.lastInvoice = '';
        let invoice = '';

        const builder = this.requestsService.getRequestBuilder()
            .setHost(this.globalService.apiHost)
            .setPath('/template/')
            .addParam('template', template)
            .get().subscribe((result: any) => {
                invoice = result.result;

                const vars = {
                    currentDay: -1,
                    currentMonth: -1,
                    currentYear: -1,
                    currentMonthName: 'no month',
                    totalHours: '',
                    totalAmount: '',
                    firstDay: -1,
                    firstMonth: -1,
                    firstYear: -1,
                    lastDay: -1,
                    lastMonth: -1,
                    lastYear: -1
                };

                const d = new Date();
                vars.currentDay = d.getDate();
                vars.currentMonth = d.getMonth() + 1;
                vars.currentYear = d.getFullYear();
                vars.currentMonthName = this.monthNames[d.getMonth()];

                let totalHours = 0;
                let firstTimestamp = new Date().getTime() + 1;
                let lastTimestamp = 0;
                this.globalService.selectedBlocks.forEach((blockID) => {
                    const block = this.globalService.getBlock(blockID);
                    console.log('Block: ' + JSON.stringify(block));

                    totalHours += block.duration;
                    if (block.timestamp < firstTimestamp) {
                        firstTimestamp = block.timestamp;
                    }
                    if (block.timestamp > lastTimestamp) {
                        lastTimestamp = block.timestamp;
                    }
                });

                const firstDate = new Date(firstTimestamp);
                const lastDate = new Date(lastTimestamp);

                vars.firstDay = firstDate.getDate();
                vars.firstMonth = firstDate.getMonth() + 1;
                vars.firstYear = firstDate.getFullYear();

                vars.lastDay = lastDate.getDate();
                vars.lastMonth = lastDate.getMonth() + 1;
                vars.lastYear = lastDate.getFullYear();

                vars.totalHours = totalHours.toString().replace('.', ',');
                vars.totalAmount = (totalHours * this.perHour).toFixed(2).replace('.', ',');

                console.log(JSON.stringify(vars));

                Object.keys(vars).forEach((key) => {
                    while (invoice.indexOf('[[' + key + ']]') !== -1) {
                        invoice = invoice.replace('[[' + key + ']]', vars[key]);
                    }
                });

                this.lastInvoice = invoice;
            });
    }

}

