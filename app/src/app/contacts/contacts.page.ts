import { Component, OnInit } from '@angular/core';
import {GlobalService} from "../shared/global.service";
import {ContactService} from "../shared/contact.service";
import {StorageService} from "../shared/storage.service";
import {RequestService} from "../shared/request.service";
import {ProjectService} from '../shared/project.service';
import {Router} from '@angular/router';
import {EditContactService} from "../shared/editContact.service";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  constructor(private storageService: StorageService,
              private requestsService: RequestService,
              private globalService: GlobalService,
              private contactService: ContactService,
              private router: Router,
              private editContactService: EditContactService) {
  }

  public selectedContact = null;

  public displayAdd = false;
  public displayImport = false;

  public displayEdit = true;

  public collapseAll() {
    this.selectedContact = null;
    this.displayAdd = false;
    this.displayImport = false;
  }

  ionViewDidEnter() {
    this.collapseAll();
    this.contactService.refreshContacts();
  }

  ngOnInit() {
    this.storageService.get('contactCodes', (contactCodes) => {
      this.globalService.contactCodes = contactCodes;
      this.contactService.refreshContacts();
    }, ['mustermann1', 'mustermann2']);
  }

  public toggleSelect(contact: any) {
    if (this.selectedContact !== null && this.selectedContact.code === contact.code) {
      this.selectedContact = null;
    } else {
      this.selectedContact = contact;
      this.editContactService.setContact(contact);
      this.displayEdit = true;
    }
  }

  alertCode(code: string) {
    alert(code);
    // May be expanded
  }

  removeContact(contact: any) {
    this.contactService.removeContactCode(contact.code);
    this.collapseAll();
  }

  addContact() {
    this.contactService.addContact();
    this.collapseAll();
  }

  importContact(code) {
    this.contactService.importContact(code);
    this.collapseAll();
  }

  editContact() {
    this.editContactService.editContact();
    // May be expanded
  }
}
