import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { JSONPlaceholderService} from './services/jsonplaceholder.service';
import { EditComponent } from './edit/edit.component';
import { RouterModule} from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AddComponent } from './add/add.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    WelcomeComponent,
    AddComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: WelcomeComponent},
      { path: 'edit/:id', component: EditComponent},
      { path: 'add' , component:AddComponent},
      { path: 'details/:id' , component: DetailsComponent}
    ]),
    FormsModule,
    NgxPaginationModule
  ],
  providers: [JSONPlaceholderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
