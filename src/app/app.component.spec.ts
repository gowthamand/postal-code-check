import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { AppComponent } from './app.component';

const API = 'https://api.postalpincode.in/pincode';

describe('AppComponent', () => {
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  function setup() {
    const fixture = TestBed.createComponent(AppComponent);
    return { fixture, app: fixture.componentInstance, el: fixture.nativeElement as HTMLElement };
  }

  it('renders the heading', async () => {
    const { fixture, el } = setup();
    await fixture.whenStable();
    expect(el.querySelector('h1')?.textContent).toContain('PIN Code Search');
  });

  it('strips non-digits and limits input to 6 characters', () => {
    const { app } = setup();
    app.onInput('11a00-0123');
    expect(app.pincode()).toBe('110001');
  });

  it('does not call the API for an invalid PIN', async () => {
    const { fixture, app, el } = setup();
    app.onInput('012345');
    app.search();
    await fixture.whenStable();
    http.expectNone(`${API}/012345`);
    expect(el.querySelector('.error-text')).toBeTruthy();
  });

  it('shows post offices returned by the API', async () => {
    const { fixture, app, el } = setup();
    app.onInput('110001');
    app.search();
    expect(app.status()).toBe('loading');

    http.expectOne(`${API}/110001`).flush([
      {
        Status: 'Success',
        Message: '',
        PostOffice: [
          { Name: 'Connaught Place', BranchType: 'Sub Post Office', DeliveryStatus: 'Non-Delivery', District: 'Central Delhi', Division: 'New Delhi Central', State: 'Delhi', Region: 'Delhi' },
        ],
      },
    ]);
    await fixture.whenStable();

    expect(app.status()).toBe('success');
    expect(el.querySelectorAll('tbody tr').length).toBe(1);
    expect(el.textContent).toContain('Connaught Place');
    expect(el.textContent).toContain('Central Delhi, Delhi');
  });

  it('shows the empty state when no offices are found', async () => {
    const { fixture, app, el } = setup();
    app.onInput('999999');
    app.search();
    http.expectOne(`${API}/999999`).flush([{ Status: 'Error', Message: 'No records found', PostOffice: null }]);
    await fixture.whenStable();

    expect(app.status()).toBe('empty');
    expect(el.textContent).toContain('No post offices found');
  });

  it('shows the error state when the request fails', async () => {
    const { fixture, app, el } = setup();
    app.onInput('110001');
    app.search();
    http.expectOne(`${API}/110001`).flush('fail', { status: 500, statusText: 'Server Error' });
    await fixture.whenStable();

    expect(app.status()).toBe('error');
    expect(el.textContent).toContain('Something went wrong');
  });
});
