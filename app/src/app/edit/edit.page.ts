import { Component, OnInit } from '@angular/core';
import {EditService} from '../shared/edit.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  constructor(private editService: EditService) { }

  ngOnInit() {
  }

}
