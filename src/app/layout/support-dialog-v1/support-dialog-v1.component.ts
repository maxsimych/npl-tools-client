import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupportService } from '@core/support.service';
import { User } from '@models/user.model';
import { htmlInputTypes, ValidationUtils } from '@shared/validationUtils';
import { Observable } from 'rxjs';

export interface SupportDialogConfig {
    authenticated: boolean;
    user?: User;
    isFeedback: boolean;
}

@Component({
    selector: 'app-support-dialog-v1',
    templateUrl: './support-dialog-v1.component.html',
    styleUrls: ['./support-dialog-v1.component.scss']
})
export class SupportDialogV1Component implements OnInit {
    public form: FormGroup;
    public isLoading: boolean;

    constructor(
        private fb: FormBuilder,
        private supportService: SupportService,
        private dialogRf: MatDialogRef<SupportDialogV1Component>,
        @Inject(MAT_DIALOG_DATA) public data: SupportDialogConfig
    ) { }

    public ngOnInit(): void {
        this.createForm();
    }

    public onSubmit(): void {
        if (this.form.valid) {
            this.sendSupport();
        }
    }

    private sendSupport(): void {
        let req: Observable<void>;

        if (this.isLoading) {
            return;
        }

        this.isLoading = true;

        if (this.data.isFeedback) {
            req = this.supportService.sendFeedback(this.form.value);
        } else {
            req = this.supportService.sendSupport(this.form.value);
        }

        req.subscribe(result => {
            this.isLoading = false;
            this.dialogRf.close();
        });
    }

    private createForm(): void {
        let name: string = null;
        let email: string = null;

        if (this.data.authenticated) {
            name = this.data.user.username;
            email = this.data.user.email;
        }

        this.form = this.fb.group({
            name: [name],
            email: [email, ValidationUtils.getDefaultInputValidators(htmlInputTypes.email, true)],
            content: [null, Validators.required]
        });
    }
}
