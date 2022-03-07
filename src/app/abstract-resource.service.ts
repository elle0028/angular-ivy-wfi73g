import { BehaviorSubject, Observable } from "rxjs";

type HasId = { id: number | string };
type IdType<T> = T extends HasId ? T['id'] : never;

type CachedName<Name extends string> = `cached${Capitalize<Name>}$`;
type RefreshCachedName<Name extends string> = `refreshCached${Capitalize<Name>}$`;
type SetCachedId<Name extends string> = `setCached${Capitalize<Name>}Id$`;
type CachedId<Name extends string> = `cached${Capitalize<Name>}Id$`;
type EditingName<Name extends string> = `editing${Capitalize<Name>}$`;
type NamedResource<Name extends string, T extends HasId> = {
  [K in CachedName<Name>]: Observable<T>
} & {
  [K in EditingName<Name>]: Observable<T>
} & {
  [K in CachedId<Name>]: BehaviorSubject<IdType<T>>
} & {
  [K in RefreshCachedName<Name>]: (() => void)
} & {
  [K in SetCachedId<Name>]: ((id: IdType<T>) => void)
}

export abstract class AbstractResource<T extends HasId, Name extends string> {
}

export type AR<T extends HasId, Name extends string> = NamedResource<Name, T> & AbstractResource<T, Name>;