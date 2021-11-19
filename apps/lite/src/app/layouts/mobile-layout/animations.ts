import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { routeOrder } from './route-order';
export const slideInAnimation = trigger('routeAnimations', [
  transition(
    (fromState, toState) => {
      const [from, to] = [
        routeOrder.indexOf(fromState),
        routeOrder.indexOf(toState),
      ];
      return to !== -1 && from !== -1 && from > to;
    },
    [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ]),
      query(':enter', [style({ left: '-100%' })]),
      query(':leave', animateChild()),
      group([
        query(':leave', [animate('300ms ease-out', style({ left: '100%' }))]),
        query(':enter', [animate('300ms ease-out', style({ left: '0%' }))]),
      ]),
      query(':enter', animateChild()),
    ]
  ),
  transition(
    (fromState, toState) => {
      const [from, to] = [
        routeOrder.indexOf(fromState),
        routeOrder.indexOf(toState),
      ];
      return to !== -1 && from !== -1 && from < to;
    },
    [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ]),
      query(':enter', [style({ left: '100%' })]),
      query(':leave', animateChild(), {
        optional: true,
      }),
      group([
        query(':leave', [animate('300ms ease-out', style({ left: '-100%' }))], {
          optional: true,
        }),
        query(':enter', [animate('300ms ease-out', style({ left: '0%' }))]),
      ]),
      query(':enter', animateChild()),
    ]
  ),
]);
export const jumpOutAnimation = trigger('routeAnimations', [
  transition('mobile => empty', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
      }),
    ]),
    query(':enter', [style({ top: '100%' })]),
    query(':leave', [style({ top: 0 })]),
    group([
      query(':leave', animateChild()),
      query(':enter', [animate('300ms ease-out', style({ top: 0 }))]),
    ]),
    query(':enter', animateChild()),
    query(':leave *', [style({}), animate(1, style({}))]),
  ]),
  transition('empty => mobile', [
    style({ position: 'relative' }),
    query(':leave, :enter', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
      }),
    ]),
    query(':enter', animateChild()),
    query(':leave', [style({ top: '0%', 'z-index': 999 })]),
    group([
      query(':leave', [animate('300ms ease-out', style({ top: '100%' }))]),
      query(':enter', style({ top: '0%' })),
    ]),
    query(':enter', animateChild()),
    query(':leave *', [style({}), animate(1, style({}))]),
  ]),
]);
