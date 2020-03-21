import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecyclePageRoutingModule } from './recycle-routing.module';

import { RecyclePage } from './recycle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecyclePageRoutingModule
  ],
  declarations: [RecyclePage]
})
export class RecyclePageModule {}
