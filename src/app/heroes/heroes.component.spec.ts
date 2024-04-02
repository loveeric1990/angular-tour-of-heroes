import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Hero } from '../hero';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroServiceMock: jasmine.SpyObj<HeroService>;

  const mockHeroes: Hero[] = [
    { id: 1, name: 'Hero 1' },
    { id: 2, name: 'Hero 2' },
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('HeroService', ['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      providers: [
        { provide: HeroService, useValue: spy }
      ]
    });

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    heroServiceMock = TestBed.inject(HeroService) as jasmine.SpyObj<HeroService>;
  });

  it('should get heroes', () => {
    heroServiceMock.getHeroes.and.returnValue(of(mockHeroes));
    component.ngOnInit();
    expect(component.heroes).toEqual(mockHeroes);
  });
});
