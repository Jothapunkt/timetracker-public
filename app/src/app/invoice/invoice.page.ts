import { Component, OnInit } from '@angular/core';
import {TemplateService} from '../shared/template.service';
import {Plugins} from '@capacitor/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit {

  constructor(private templateService: TemplateService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
  }

    copy() {
      const { Clipboard } = Plugins;

      Clipboard.write({
        string: this.templateService.lastInvoice
      });

    }
}
