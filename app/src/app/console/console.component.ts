import { Component, OnInit } from '@angular/core';
import {LoggerService} from '../shared/logger.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss'],
})
export class ConsoleComponent implements OnInit {

  constructor(private logger: LoggerService) { }

  ngOnInit() {}

}
