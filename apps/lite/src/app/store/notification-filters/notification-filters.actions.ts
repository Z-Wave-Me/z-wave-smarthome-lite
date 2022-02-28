// export class NotificationFiltersAction {
//   static readonly type = '[NotificationFilters] Add item';
//   constructor(public payload: string) { }
// }

export class SetTypeAndSourceFilters {
  static readonly type = '[NotificationFilters] Set  Type and Source Filters';
  constructor(public sourceOrType: string = '') {}
}

export class ResetFilters {
  static readonly type = '[NotificationFilters] Reset Filters';
}

export class SetTimeFilters {
  static readonly type = '[NotificationFilters] Set Time  Filters';
  constructor(public startTime = 0, public endTime = Infinity) {}
}
