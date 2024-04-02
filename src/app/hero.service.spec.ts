import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { Hero } from './hero';

describe('HeroService', () => {
  let service: HeroService;
  let httpMock: HttpTestingController;
  let messageService: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService, MessageService]
    });

    service = TestBed.inject(HeroService);
    httpMock = TestBed.inject(HttpTestingController);
    messageService = TestBed.inject(MessageService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch heroes', () => {
    const mockHeroes: Hero[] = [
      { id: 1, name: 'Hero 1' },
      { id: 2, name: 'Hero 2' }
    ];

    service.getHeroes().subscribe(heroes => {
      expect(heroes).toEqual(mockHeroes);
    });

    const req = httpMock.expectOne(`${service.heroesUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes);
  });

  it('should fetch hero by id', () => {
    const mockHero: Hero = { id: 1, name: 'Hero 1' };

    service.getHero(1).subscribe(hero => {
      expect(hero).toEqual(mockHero);
    });

    const req = httpMock.expectOne(`${service.heroesUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockHero);
  });

  it('should update hero', () => {
    const mockHero: Hero = { id: 1, name: 'Hero 3' };

    service.updateHero(mockHero).subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${service.heroesUrl}`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('should add hero', () => {
    const mockHero: Hero = { id: 1, name: 'Hero 1' };

    service.addHero(mockHero).subscribe(addedHero => {
      expect(addedHero).toEqual(mockHero);
    });

    const req = httpMock.expectOne(`${service.heroesUrl}`);
    expect(req.request.method).toBe('POST');
    req.flush(mockHero);
  });

  it('should delete hero', () => {
    const mockHero: Hero = { id: 1, name: 'Hero 1' };

    service.deleteHero(1).subscribe(deletedHero => {
      expect(deletedHero).toEqual(mockHero);
    });

    const req = httpMock.expectOne(`${service.heroesUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockHero);
  });

  it('should search heroes', () => {
    const mockHeroes: Hero[] = [
      { id: 1, name: 'Hero 1' },
      { id: 2, name: 'Hero 2' }
    ];

    service.searchHeroes('Hero').subscribe(heroes => {
      expect(heroes).toEqual(mockHeroes);
    });

    const req = httpMock.expectOne(`${service.heroesUrl}/?name=Hero`);
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes);
  });
});
