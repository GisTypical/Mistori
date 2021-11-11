import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/User';
import { Manga } from '../../../shared/Manga';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @Input() mangas: Manga[];
  user: User;
  isLoading: Observable<boolean>;

  constructor(
    private userService: UserService,
    private loadingService: LoadingService
  ) {
    this.isLoading = this.loadingService.currentLoading;
  }

  ngOnInit() {
    this.userService.userData().subscribe((user) => {
      this.user = user;
    });
  }
}
