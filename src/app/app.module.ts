import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AComponent } from './a.component';
import { BComponent } from './b/b.component';
import { CComponent } from './c/c.component';
import { ResourceService } from './resource.service';
import { ResourceApiService } from './resource.api.service';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, AComponent, BComponent, CComponent],
  bootstrap: [AppComponent],
  providers: [ResourceService, ResourceApiService],
})
export class AppModule {}
