import { Component, Input, OnInit } from '@angular/core';
import { ResourceService } from './resource.service';
import { UserModel } from './user.model';

@Component({
  selector: 'app-a',
  template: `
    <h1>Hi</h1>
    <div *ngIf="editingUser">
      <h3>
        User: 
        <input type="text" [(ngModel)]="editingUser.username" (keyup)="compare()"/> 
      </h3>
      <h3>
        email:
        <input type="text" [(ngModel)]="editingUser.email" (keyup)="compare()"/>
      </h3>
      <h3>
        name:
        <input type="text" [(ngModel)]="editingUser.name" (keyup)="compare()"/>
      </h3>
    </div>
    <button (click)="getRandomUser()">Get Random User</button>
    <button (click)="getNewUser()">Get Empty User</button>
    <br />
    <button [disabled]= "!isDirty || loading" (click)="save()">Save</button>
    <span *ngIf="loading">loading...</span>
  `,
  styles: [`h1 { font-family: Lato; }`],
})
export class AComponent implements OnInit {
  loading: boolean = false;
  isDirty: boolean = false;
  cachedUser: UserModel;
  editingUser: UserModel;

  constructor(private service: ResourceService) {}

  ngOnInit() {
    // deal with subs
    this.service.cachedResource$.subscribe((user) => {
      console.log('cache sub', user);
      this.cachedUser = user;
      this.isDirty = false;
    });

    this.service.editingResource$.subscribe((user) => {
      console.log('editing sub', user);
      this.editingUser = user;
    });
  }

  getRandomUser() {
    this.service.getUserById(Math.floor(Math.random() * 3));
  }

  getNewUser() {
    this.service.getUserById(-1);
  }

  save() {
    this.loading = true;
    this.service.updateUser(this.editingUser).subscribe(() => {
      this.loading = false;
      console.log('After Save');
    });
  }

  compare() {
    this.isDirty = !this.editingUser.equals(this.cachedUser);
  }
}
