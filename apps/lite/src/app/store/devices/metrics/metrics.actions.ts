export class MetricsAction {
  static readonly type = '[Metrics] Add item';
  constructor(public payload: string) {}
}
