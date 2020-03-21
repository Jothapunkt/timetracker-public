import { Component, OnInit } from '@angular/core';
import {AddService} from '../shared/add.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  constructor(private addService: AddService) { }

  ngOnInit() {
  }

}
