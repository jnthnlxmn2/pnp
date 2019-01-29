import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { routerTransition } from '../../router.animations';
import swal from 'sweetalert2';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [routerTransition()]
})
export class UserComponent implements OnInit {
  user: any = {};
  users: any = [];
  me: any = {};
  constructor(public userservice: UserService) { }

  ngOnInit() {
    this.userservice.getUsers().then((response) => {
      let data: any = response;
      if (data.data) {
        this.users = data.data.data;
      }
    })
    this.userservice.getMe().then((response) => {
      let data: any = response;
      if (data.data) {
        this.me = data.data;
      }
      console.log('me', this.me);
    })
  }

  submit() {
    this.user.name = this.user.first_name;
    this.userservice.register(this.user).then(response => {
      let data: any = response;
      if (data.success) {
        this.user = {};
        swal({
          type: 'success',
          title: 'Success!',
          text: 'close',
        });
        this.ngOnInit();
      } else {
        swal({
          type: 'warning',
          title: 'Error!',
          text: 'close',
        });

      }
    })
  }

}
