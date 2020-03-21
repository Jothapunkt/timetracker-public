import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecyclePage } from './recycle.page';

describe('RecyclePage', () => {
  let component: RecyclePage;
  let fixture: ComponentFixture<RecyclePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecyclePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecyclePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
