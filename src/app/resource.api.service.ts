import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserApiModel, UserModel } from './user.model';

function delay() {
  return Math.floor(Math.random() * 2000) + 2;
}

let mattApi = {
  id: 1,
  username: 'matt',
  email: 'me@email.com',
  firstName: 'Matt',
  lastName: 'Ellero',
};

let alexApi = {
  id: 2,
  username: 'alex',
  email: 'alex@email.com',
  firstName: 'Alex',
  lastName: 'G',
};

let tadoApi = {
  id: 3,
  username: 'tado',
  email: 'tado@email.com',
  firstName: 'BMan',
  lastName: 'Tado',
};

@Injectable()
export class ResourceApiService {
  constructor() {}

  getUserById(id: number): Observable<UserModel> {
    return of(randomUser());
  }

  updateUser(user: UserApiModel): Observable<void> {
    const apiUser = [mattApi, alexApi, tadoApi].find(
      (api) => api.id === user.id
    );
    if (apiUser) {
      apiUser.id = user.id;
      apiUser.username = user.username;
      apiUser.email = user.email;
      apiUser.firstName = user.firstName;
      apiUser.lastName = user.lastName;
      console.log('updated', apiUser.username);
      return timer(delay()).pipe(map(() => {}));
    }
    // Create new
    return timer(delay()).pipe(map(() => {}));
  }
}

function randomUser(): UserModel {
  const r = Math.floor(Math.random() * 3);
  console.log('getting', [mattApi, alexApi, tadoApi]);
  return [
    new UserModel(mattApi),
    new UserModel(alexApi),
    new UserModel(tadoApi),
  ][r];
}
