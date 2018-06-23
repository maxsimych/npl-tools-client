import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '@core/authentication.guard';
import { ForbiddenComponent } from './home/forbidden/forbidden.component';
import { LayoutUnauthenticatedComponent } from './home/layout-unauthenticated/layout-unauthenticated.component';
import { LayoutComponent } from './home/layout/layout.component';
import { LoginComponent } from './home/login/login.component';
import { LogoutComponent } from './home/logout/logout.component';
import { NotFoundComponent } from './home/not-found/not-found.component';
import { UnverifiedEmailComponent } from './home/unverified-email/unverified-email.component';
import { ToolsComponent } from './tools/tools/tools.component';
import { ToolContainerComponent } from './tools/tool-container/tool-container.component';
import { GMTemplateNames } from '@shared/GMTemplates';
import { ToolListComponent } from './tools/tool-list/tool-list.component';
import { ToolComponent } from './tools/tool/tool.component';
import { ChurchCirclesTemplate } from './templates/church-circles';
import { FourFieldsTemplate } from './templates/four-fields';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'tools',
        pathMatch: 'full'
    },
    {
        path: '',
        component: LayoutUnauthenticatedComponent,
        children: [{
            path: 'login',
            component: LoginComponent
        }, {
            path: 'logout',
            component: LogoutComponent
        }, {
            path: 'forbidden',
            component: ForbiddenComponent
        }, {
            path: 'unverified',
            component: UnverifiedEmailComponent
        }, {
            path: 'notfound',
            component: NotFoundComponent
        }]
    },
    {
        path: '',
        component: LayoutComponent,
        children: [{
            path: 'tools',
            component: ToolsComponent
        }, {
            path: 'church-circles',
            component: ToolContainerComponent,
            children: [
                {
                    path: '',
                    component: ToolListComponent,
                    data: {
                        template: ChurchCirclesTemplate
                    }
                },
                {
                    path: ':id',
                    component: ToolComponent,
                    data: {
                        template: ChurchCirclesTemplate
                    }
                }
            ]
        }, {
            path: 'four-fields',
            component: ToolContainerComponent,
            children: [
                {
                    path: '',
                    component: ToolListComponent,
                    data: {
                        template: FourFieldsTemplate
                    }
                },
                {
                    path: ':id',
                    component: ToolComponent,
                    data: {
                        template: FourFieldsTemplate
                    }
                }
            ]
        }]
    },
    {
        path: '**',
        redirectTo: 'tools'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes
        )
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class AppRoutingModule {
}
