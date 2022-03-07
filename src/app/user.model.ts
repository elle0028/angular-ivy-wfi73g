export interface UserApiModel {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export class UserModel {
  id: number;
  username: string;
  email: string;
  name: string;

  constructor(apiModel: UserApiModel) {
    this.id = apiModel.id;
    this.username = apiModel.username;
    this.email = apiModel.email;
    this.name = apiModel.firstName + ' ' + apiModel.lastName;
  }

  toApiModel(): UserApiModel {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      firstName: this.name.split(' ')[0],
      lastName: this.name.split(' ')[1],
    };
  }

  clone(): UserModel {
    return new UserModel(this.toApiModel());
  }

  equals(other: UserModel): boolean {
    return (
      this.id === other.id &&
      this.username === other.username &&
      this.email === other.email &&
      this.name === other.name
    );
  }
}

export const EmptyUserModel = new UserModel({
  id: -1,
  username: '',
  email: '',
  firstName: '',
  lastName: '',
});
