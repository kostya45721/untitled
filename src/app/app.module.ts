import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import {HttpClientModule} from '@angular/common/http';
import { UserCreateComponent } from './user-create/user-create.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoMaterialModule} from './ngmaterial.module';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserDetailComponent,
    UserCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
  ],
  providers: [ AppComponent ],
  bootstrap: [AppComponent],
  entryComponents: [AppComponent],

})
export class AppModule { }
