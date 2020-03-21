import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LoggerService} from '../shared/logger.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss'],
})
export class ConsoleComponent implements OnInit {

  constructor(private logger: LoggerService,
              private ref: ChangeDetectorRef) { }

  ngOnInit() {
    window.setInterval(() => {
      this.update();
    }, 300);
  }

  public update() {
    this.ref.detectChanges();
  }

}
