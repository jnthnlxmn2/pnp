import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/services/user.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;
    closeResult: string;
    me: any = {};
    c_password: any = '';
    new_password: any = '';
    old_password: any = '';
    promt: any = '';
    constructor(public authservice: AuthService, private modalService: NgbModal, private translate: TranslateService, public router: Router, public userservice: UserService) {

        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
        this.userservice.getMe().then((response) => {
            let data: any = response;
            if (data.data) {
                this.me = data.data;
            }
        })
    }

    open(content) {
        this.modalService.open(content, { size: 'lg' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    change() {
        this.authservice.entryChange(this.me.email, this.old_password).then(response => {
            let data: any = response;
            console.log(data)
            if (data.success) {
                if (this.new_password == this.c_password) {
                    this.authservice.changePassword(this.new_password).then(response => {
                        let data: any = {};
                        data = response;
                        if (data.data) {
                            if (data.data.status == 'success') {
                                swal({
                                    type: 'success',
                                    title: 'Success!',
                                    text: 'close',
                                });
                                this.authservice.logout();
                            } else {
                                this.promt = 'Error';
                            }
                        } else {
                            this.promt = 'Error';
                        }

                    })
                } else {
                    console.log('new password and confirm password is not the same');
                    this.promt = 'New Password and Confirm password should be the same';
                }
            }
            else if (data.error) {
                this.promt = 'Wrong Password';
                console.log('wrong password');
            }
        })
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
