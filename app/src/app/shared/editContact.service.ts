import {Injectable} from '@angular/core';
import {Plugins} from '@capacitor/core';
import {RequestService} from './request.service';
import {GlobalService} from './global.service';
import {ContactService} from './contact.service';

@Injectable({
    providedIn: 'root'
})
export class EditContactService {
    constructor(private requestsService: RequestService,
                private globalService: GlobalService,
                private contactService: ContactService) {}

    public contact = {
        code: undefined,
        fullname: undefined,
        phone: undefined,
        mail: undefined,
        address: undefined
    };

    public editContact() {
        const builder = this.requestsService.getRequestBuilder();
        builder.setHost(this.globalService.apiHost)
            .setPath('editContact/index.php')
            .addParam('code', this.contact.code)
            .addParam('fullname', this.contact.fullname)
            .addParam('phone', this.contact.phone)
            .addParam('mail', this.contact.mail)
            .addParam('address', this.contact.address)
            .get().subscribe((result: any) => {
            this.contactService.refreshContacts();
            console.log(JSON.stringify(result));
        });
    }

    public setContact(contact) {
        this.contact.code = contact.code;
        this.contact.fullname = contact.fullname;
        this.contact.phone = contact.phone;
        this.contact.mail = contact.mail;
        this.contact.address = contact.address;
    }
}
