import { AdminModule } from '@admin/admin.module';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { GenMapperConfigs, GenMapperTemplates } from '@templates';
import { environment } from '../environments/environment';
import { AccountModule } from './account/account.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GM_CONFIGS, GM_TEMPLATES } from './core/template.injecttoken';
import { HomeModule } from './home/home.module';
import { LayoutModule } from './layout/layout.module';
import { ToolsModule } from './tools/tools.module';
import { UpdatesModule } from './updates/updates.module';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        LayoutModule,
        HomeModule,
        ToolsModule,
        AccountModule,
        AdminModule,
        UpdatesModule,
        AppRoutingModule,
        AgmCoreModule.forRoot({
            apiKey: environment.apiKey,
            libraries: ['places']
        })
    ],
    providers: [
        {
            provide: GM_TEMPLATES,
            useValue: GenMapperTemplates
        },
        {
            provide: GM_CONFIGS,
            useValue: GenMapperConfigs
        }
    ],
    bootstrap: [AppComponent],
    exports: []
})
export class AppModule { }
