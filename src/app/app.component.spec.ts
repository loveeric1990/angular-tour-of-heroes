import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'heroes', component: HeroesComponent },
          { path: 'dashboard', component: DashboardComponent}
        ]),
      ],
      declarations: [
        AppComponent,
        MessagesComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-tour-of-heroes'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-tour-of-heroes');
  });

  it('should render links', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('nav a')?.textContent).withContext('Heroes');
    expect(compiled.querySelector('nav a')?.textContent).withContext('Dashboard');
  });

  it ('can navigate to heroes', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('nav a') as HTMLAnchorElement;
    expect(link.textContent).toContain('Heroes');
    expect(link.getAttribute('routerLink')).toEqual('/heroes');
  });

  // it ('can navigate to dashboard', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   const link = compiled.querySelector('nav a') as HTMLAnchorElement;
  //   expect(link.textContent).toContain('Dashboard');
  //   expect(link.getAttribute('routerLink')).toEqual('/dashboard');
  // });
});
