import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BUILD_TIME } from './build-info';
import { PIN_PATTERN, PostalService } from './postal.service';

type Status = 'idle' | 'loading' | 'success' | 'empty' | 'error';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly buildTime = BUILD_TIME;
  readonly buildTimeLabel = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(BUILD_TIME));

  pincode = signal('');
  touched = signal(false);
  searchedPin = signal<string | undefined>(undefined);

  private result = inject(PostalService).postOffices(this.searchedPin);

  isValid = computed(() => PIN_PATTERN.test(this.pincode()));
  showError = computed(() => this.touched() && !this.isValid());

  posts = computed(() => (this.result.hasValue() ? this.result.value() : []));

  status = computed<Status>(() => {
    if (!this.searchedPin()) return 'idle';
    if (this.result.isLoading()) return 'loading';
    if (this.result.error()) return 'error';
    return this.posts().length ? 'success' : 'empty';
  });

  summary = computed(() => {
    const first = this.posts()[0];
    return first ? `${first.District}, ${first.State}` : '';
  });

  onInput(value: string) {
    this.pincode.set(value.replace(/\D/g, '').slice(0, 6));
  }

  search() {
    this.touched.set(true);
    if (!this.isValid()) return;

    const pin = this.pincode();
    if (pin === this.searchedPin()) {
      this.result.reload();
    } else {
      this.searchedPin.set(pin);
    }
  }
}
