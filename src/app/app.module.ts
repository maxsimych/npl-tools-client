import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        CoreModule,
        HomeModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
