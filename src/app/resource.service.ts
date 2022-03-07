import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { ResourceApiService } from './resource.api.service';
import { EmptyUserModel, UserModel } from './user.model';

@Injectable()
export class ResourceService {
  // TODO: loading

  private cachedResourceId$ = new BehaviorSubject<number>(-1);
  private refreshCachedResource$ = new Subject<void>();

  cachedResource$: Observable<UserModel>;
  editingResource$: Observable<UserModel>;

  constructor(private api: ResourceApiService) {
    this.cachedResource$ = this.cachedResourceId$.pipe(
      tap((id) => console.log('id', id)),
      switchMap((id) => this.newOrGetById(id)),
      shareReplay(1)
    );
    this.editingResource$ = this.cachedResource$.pipe(
      map((user) => user.clone())
    );
  }

  getUserById(id: number) {
    // Can we return some observable to track when update is done?
    this.cachedResourceId$.next(id);
  }

  updateUser(user: UserModel): Observable<void> {
    return this.api.updateUser(user.toApiModel()).pipe(
      tap(() => console.log('updated')),
      tap(() => this.refreshCachedResource())
    );
  }

  private refreshCachedResource() {
    console.log('refreshing');
    this.cachedResourceId$.next(this.cachedResourceId$.value);
  }

  private newOrGetById(id: number): Observable<UserModel> {
    console.log('check id');
    if (id === -1) {
      return of(EmptyUserModel);
    }

    return this.api.getUserById(id);
  }
}
