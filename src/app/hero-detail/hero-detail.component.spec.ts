import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { Hero } from '../hero';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let heroServiceMock: jasmine.SpyObj<HeroService>;
  let locationMock: jasmine.SpyObj<Location>;

  const mockHero: Hero = { id: 1, name: 'Hero 1' };

  beforeEach(() => {
    const heroServiceSpy = jasmine.createSpyObj('HeroService', ['getHero', 'updateHero']);
    const locationSpy = jasmine.createSpyObj('Location', ['back']);

    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      providers: [
        { provide: HeroService, useValue: heroServiceSpy },
        { provide: Location, useValue: locationSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } }
        }
      ]
    });

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    heroServiceMock = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
    locationMock = TestBed.inject(Location) as jasmine.SpyObj<Location>;
  });

  it('should get hero by id', () => {
    heroServiceMock.getHero.and.returnValue(of(mockHero));
    component.ngOnInit();
    expect(component.hero).toEqual(mockHero);
  });

  it('should go back', () => {
    component.goBack();
    expect(locationMock.back).toHaveBeenCalled();
  });

  it('should save hero', () => {
    component.hero = mockHero;
    heroServiceMock.updateHero.and.returnValue(of({}));
    spyOn(component, 'goBack');
    component.save();
    expect(heroServiceMock.updateHero).toHaveBeenCalledWith(mockHero);
    expect(component.goBack).toHaveBeenCalled();
  });
});
