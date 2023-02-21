import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterModule, RouterStateSnapshot } from '@angular/router';

import { AuthenticatedGuard } from './authenticated.guard';

function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url,
  } as RouterStateSnapshot;
}

describe('AuthenticatedGuard', () => {
  let guard: AuthenticatedGuard;
  let router: Router
  const dummyRoute = {} as ActivatedRouteSnapshot;
  const fakeUrls = ['/login'];
  let routerSpy: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterModule,
        HttpClientModule
      ]
    });
    guard = TestBed.inject(AuthenticatedGuard);
    router = TestBed.inject(Router)
    routerSpy = jasmine.createSpyObj<Router>('Router', ['navigate']);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it(`Dado á chamada do método "canActive",
      quando o valor  da variável "autheticated" for false,
      deve navegar para a rota "/login" e retornar false.`, () => {
      spyOn(router,'navigateByUrl');
      const authentication = guard.canActivate(dummyRoute, fakeRouterState(fakeUrls[0]))
      expect(router.navigateByUrl).toHaveBeenCalledWith('/login')
      expect(authentication).toEqual(false)
  })

  it(`Dado á chamada do método "canActive",
      quando o valor  da variável "autheticated" for true,
      deve retornar true.`, () => {
        spyOn(localStorage,'getItem').and.returnValue('authenticated');
        const authentication = guard.canActivate(dummyRoute, fakeRouterState(fakeUrls[0]))
        expect(authentication).toEqual(true)
  })
});
