import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { routerTransition } from '../router.animations';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    email: any = "";
    password: any = "";
    promt = "";
    constructor(
        private translate: TranslateService,
        public router: Router,
        public authservice: AuthService,
        private spinner: NgxSpinnerService
    ) {
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');
    }

    ngOnInit() { }

    onLoggedin() {

    }

    login(email, password) {
        console.log(this.email);
        this.spinner.show();
        this.authservice.doLogin(email, password).then(response => {
            let data: any = response;
            console.log(data)
            if (data.success) {
                this.spinner.hide();
                /* localStorage.setItem('isLoggedin', 'true'); */
                this.router.navigate(['/dashboard']);
                localStorage.setItem('isLoggedin', 'true');
            }
            else if (data.error) {
                this.spinner.hide();
                this.promt = data.error.error;
                setTimeout(() => {
                    this.promt = "";
                }, 3000)
            }
        })
    }

}