import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

const mockResponse: {results: Array<any>} =
{
  results: [
    {
      name: "CR90 corvette",
      cargo_capacity: "3000000",
      consumables: "1 year",
      cost_in_credits: "3500000"
    },
    {
      name: "Star Destroyer",
      cargo_capacity: "36000000",
      consumables: "2 years",
      cost_in_credits: "150000000"
    },
    {
      name: "Sentinel-class landing craft",
      cargo_capacity: "180000",
      consumables: "1 month",
      cost_in_credits: "240000"
    }
  ]
};

describe('DataService', () => {
  let dataService: DataService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController)
    dataService = TestBed.inject(DataService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(dataService).toBeTruthy();
  });

  it('should be able to get all people', () => {
    dataService.searchForPeople('').subscribe({
      next: res => expect(res).toEqual(mockResponse.results),
      error: fail
    });

    const req = httpTestingController.expectOne(dataService.peopleSource);
    expect(req.request.method).toEqual('GET');

    req.flush(mockResponse);
  });

  it('should be able to filter people', () => {
    const term = 'Star';
    dataService.searchForPeople(term).subscribe({
      next: res => expect(res).toEqual(mockResponse.results),
      error: fail
    });

    const req = httpTestingController.expectOne(dataService.peopleSource + dataService.filterRelativePath + term);
    expect(req.request.method).toEqual('GET');

    req.flush(mockResponse);
  });

  it('should be able to get all starships', () => {
    dataService.searchForShips('').subscribe({
      next: res => expect(res).toEqual(mockResponse.results),
      error: fail
    });

    const req = httpTestingController.expectOne(dataService.shipsSource);
    expect(req.request.method).toEqual('GET');

    req.flush(mockResponse);
  });

  it('should be able to filter starships', () => {
    const term = 'Star';
    dataService.searchForShips(term).subscribe({
      next: res => expect(res).toEqual(mockResponse.results),
      error: fail
    });

    const req = httpTestingController.expectOne(dataService.shipsSource + dataService.filterRelativePath + term);
    expect(req.request.method).toEqual('GET');

    req.flush(mockResponse);
  });
});
