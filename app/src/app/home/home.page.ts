import { Component } from '@angular/core';
import {TestService} from '../shared/request.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
      private testService: TestService
  ) {}

}
