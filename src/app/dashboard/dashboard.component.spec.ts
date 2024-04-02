import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { HeroSearchComponent } from '../hero-search/hero-search.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let heroServiceMock: jasmine.SpyObj<HeroService>;

  const mockHeroes: Hero[] = [
    { id: 1, name: 'Hero 1' },
    { id: 2, name: 'Hero 2' },
    { id: 3, name: 'Hero 3' },
    { id: 4, name: 'Hero 4' },
    { id: 5, name: 'Hero 5' },
  ];

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HeroService', ['getHeroes']);

    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        HeroSearchComponent
      ],
      providers: [
        { provide: HeroService, useValue: spy }
      ]
    });

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    heroServiceMock = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
  });

  it('should get top 4 heroes', () => {
    heroServiceMock.getHeroes.and.returnValue(of(mockHeroes));
    component.ngOnInit();
    expect(component.heroes.length).toBe(4);
    expect(component.heroes).toEqual(mockHeroes.slice(1, 5));
  });
});
