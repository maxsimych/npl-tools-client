import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LocaleService, TranslationType } from '@core/locale.service';
import { Unsubscribable } from '@core/Unsubscribable';
import { User } from '@models/user.model';
import i18next from 'i18next';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UpdatesService } from '../../updates/updates.service';
import { SupportDialogV1Component, SupportDialogConfig } from '../support-dialog-v1/support-dialog-v1.component';
import { SupportDialogComponent } from '../support-dialog/support-dialog.component';


@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent extends Unsubscribable implements OnInit {
    public translations$: Observable<TranslationType[]>;
    public localeControl: FormControl;

    @Input()
    public authenticated: boolean;

    @Input()
    public user: User = null;

    constructor(
        private dialog: MatDialog,
        private localeService: LocaleService,
        private updatesService: UpdatesService,
    ) { super(); }

    public ngOnInit(): void {
        this.translations$ = this.localeService.getTranslations();
        this.localeControl = new FormControl(i18next.language);

        this.localeControl.valueChanges.pipe(takeUntil(this.unsubscribe))
            .subscribe(result => {
                this.localeService.set(result);
            });
    }

    public goto(event: Event, url: string): void {
        event.preventDefault();
        event.stopPropagation();
        window.open(url, '_blank');
    }

    public showUpdates(): void {
        this.updatesService.show();
    }

    public sendFeedback(): void {
        this.dialog.open<SupportDialogV1Component, SupportDialogConfig, void>(SupportDialogV1Component, {
            data: {
                authenticated: this.authenticated,
                user: this.user,
                isFeedback: true,
            }
        });
    }

    public help(): void {
        this.dialog.open<SupportDialogComponent, void, void>(SupportDialogComponent);

        // this.dialog.open<SupportDialogV1Component, SupportDialogConfig, void>(SupportDialogV1Component, {
        //     data: {
        //         authenticated: this.authenticated,
        //         user: this.user,
        //         isFeedback: false,
        //     }
        // });
    }
}
