import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const routeTransitionAnimations = trigger('mainRouteAnimation', [
  // transition('* => *', [
  //   query(':enter, :leave', style({ position: 'fixed', width: '100%', height: '100%' }), { optional: true }),
  //   query(':enter', style({ transform: 'translateX(100%)' }), { optional: true }),
  //
  //   group([
  //     query(':leave', [
  //       style({ transform: 'translateX(0%)' }),
  //       animate('.3s ease-out', style({transform: 'translateX(-100%)'}))
  //     ], { optional: true } ),
  //     query(':enter', [
  //       animate('.3s ease-out', style({transform: 'translateX(0%)'})),
  //       animateChild()
  //     ], { optional: true })
  //   ]),
  // ]),
  transition('* => control', [
    query(
      ':enter, :leave',
      style({ position: 'fixed', width: '100%', height: '100%' }),
      { optional: true }
    ),
    query(':enter', style({ transform: 'translateY(100%)' }), {
      optional: true,
    }),

    group([
      query(':leave', [animate('.3s ease-out', style({ opacity: '0' }))], {
        optional: true,
      }),
      query(
        ':enter',
        [
          animate('.3s ease-out', style({ transform: 'translateY(0%)' })),
          animateChild(),
        ],
        {
          optional: true,
        }
      ),
    ]),
  ]),
  transition('control => *', [
    query(
      ':enter, :leave',
      style({ position: 'fixed', width: '100%', height: '100%' }),
      { optional: true }
    ),
    query(':enter', style({ opacity: '0' }), { optional: true }),

    group([
      query(
        ':leave',
        [
          style({ transform: 'translateY(0%)' }),
          animate('.3s ease-out', style({ transform: 'translateY(100%)' })),
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [animate('.3s ease-out', style({ opacity: '1' })), animateChild()],
        { optional: true }
      ),
    ]),
  ]),
]);
