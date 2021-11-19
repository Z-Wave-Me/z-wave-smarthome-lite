import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { RemoveUser, SetUser } from './user.actions';
import { User } from '@interfaces/user';

export class UserStateModel {
  public user: User | null = null;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: null,
  },
})
@Injectable()
export class UserState {
  @Selector()
  static getUser(state: UserStateModel): User | null {
    return state.user;
  }
  @Action(RemoveUser)
  remove({ setState }: StateContext<UserStateModel>): void {
    setState({ user: null });
  }

  @Action(SetUser)
  set({ setState }: StateContext<UserStateModel>, { payload }: SetUser): void {
    // const state = getState();
    setState({ user: payload });
  }
}
