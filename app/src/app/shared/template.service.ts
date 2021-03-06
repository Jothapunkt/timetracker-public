import {Injectable} from '@angular/core';
import {Plugins} from '@capacitor/core';
import {GlobalService} from './global.service';
import {RequestService} from './request.service';
import {ContactService} from './contact.service';

@Injectable({
    providedIn: 'root'
})
export class TemplateService {
    // tslint:disable-next-line:max-line-length
    public monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
    public lastInvoice = '';

    constructor(private globalService: GlobalService,
                private requestsService: RequestService,
                private contactService: ContactService) {
    }

    public async parseInvoice(template: string) {
        this.lastInvoice = '';
        let invoice = '';
        console.log('Parsing template ' + template);
        const sender: any = await this.contactService.loadContact(this.globalService.currentProject.sender);
        console.log('sender: ' + JSON.stringify(sender));
        const recipient: any = await this.contactService.loadContact(this.globalService.currentProject.recipient);
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
                    lastYear: -1,
                    blockTable: '',
                    recipientName: '',
                    recipientPhone: '',
                    recipientMail: '',
                    recipientAddress: '',
                    senderName: '',
                    senderPhone: '',
                    senderMail: '',
                    senderAddress: '',
                    projectName: ''
                };

                const d = new Date();
                vars.currentDay = d.getDate();
                vars.currentMonth = d.getMonth() + 1;
                vars.currentYear = d.getFullYear();
                vars.currentMonthName = this.monthNames[d.getMonth()];

                let totalHours = 0;
                let firstTimestamp = new Date().getTime() + 1;
                let lastTimestamp = 0;
                const blockTable = [];

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

                    blockTable.push(block.day
                        + '.' + block.month
                        + '.' + block.year
                        + ' & ' + block.description
                        + ' & ' + Number(block.duration).toFixed(2).replace('.', ',') + 'h');
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
                vars.totalAmount = (totalHours * Number(this.globalService.currentProject.rate)).toFixed(2).replace('.', ',');

                vars.blockTable = blockTable.join('\\\\');

                vars.recipientName = recipient.fullname;
                vars.recipientPhone = recipient.phone;
                vars.recipientMail = recipient.mail;
                vars.recipientAddress = recipient.address;

                vars.senderName = sender.fullname;
                vars.senderPhone = sender.phone;
                vars.senderMail = sender.mail;
                vars.senderAddress = sender.address;

                vars.projectName = this.globalService.currentProject.title;

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

