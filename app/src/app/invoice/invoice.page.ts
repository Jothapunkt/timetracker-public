import { Component, OnInit } from '@angular/core';
import {InvoiceService} from '../shared/invoice.service';
import {Plugins} from '@capacitor/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.page.html',
  styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit {

  constructor(private invoiceMakerService: InvoiceService) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.invoiceMakerService.parseInvoice();
  }

    copy() {
      const { Clipboard } = Plugins;

      Clipboard.write({
        string: this.invoiceMakerService.lastInvoice
      });

    }
}
