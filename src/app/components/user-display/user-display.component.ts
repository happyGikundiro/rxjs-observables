import { Component } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { UserDetails } from '../../model/model';


@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
})
export class UserDisplayComponent {
  users: UserDetails[] = [];
  loading = false;
  error: string | null = null;

  constructor(private userService: UserService) {}

  fetchUsers() {
    this.loading = true;
    this.error = null;

    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = response;
        this.loading = false;
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
      }
    });
  }
}
