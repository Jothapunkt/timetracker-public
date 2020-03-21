import {Injectable} from '@angular/core';
import {Plugins} from '@capacitor/core';
import {GlobalService} from './global.service';
import { File } from '@ionic-native/file/ngx';

@Injectable({
    providedIn: 'root'
})
export class InvoiceMakerService {
    // tslint:disable-next-line:max-line-length
    public monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    public perHour = 11;

    constructor(private globalService: GlobalService,
                private file: File) {
    }

    public getInvoiceText() {
        let invoice = '';
        this.file.checkFile(this.file.applicationDirectory, this.globalService.invoiceTemplatePath).then(() => {
            console.log('Invoice template found');
        }).catch(() => {
            console.error('Could not find invoice template');
        });

        this.file.readAsText(this.file.applicationDirectory, this.globalService.invoiceTemplatePath).then((value) => {
            invoice = value;
        }).catch(err => console.log('Could not read invoice template'));

        const vars = {
            currentDay: undefined,
            currentMonth: undefined,
            currentYear: undefined,
            currentMonthName: undefined,
            totalHours: undefined,
            totalAmount: undefined,
            firstDay: undefined,
            firstMonth: undefined,
            firstYear: undefined,
            lastDay: undefined,
            lastMonth: undefined,
            lastYear: undefined
        };

        const d = new Date();
        vars.currentDay = d.getDate();
        vars.currentMonth = d.getMonth() + 1;
        vars.currentYear = d.getFullYear();
        vars.currentMonthName = this.monthNames[d.getMonth()];

        let totalHours = 0;
        let firstTimestamp = Infinity;
        let lastTimestamp = 0;
        this.globalService.selectedBlocks.forEach((block) => {
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

        vars.totalHours = totalHours;
        vars.totalAmount = totalHours * this.perHour;

        Object.keys(vars).forEach((key) => {
            invoice = invoice.replace('[[' + key + ']]', vars[key]);
        });

        return invoice;
    }

}

