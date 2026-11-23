import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { PostOffice, PostalService } from './postal.service';

type Status = 'idle' | 'loading' | 'success' | 'empty' | 'error';

const PIN_PATTERN = /^[1-9]\d{5}$/;

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private postalService = inject(PostalService);
  private request?: Subscription;

  pincode = signal('');
  status = signal<Status>('idle');
  posts = signal<PostOffice[]>([]);
  searchedPin = signal('');
  touched = signal(false);

  isValid = computed(() => PIN_PATTERN.test(this.pincode()));
  showError = computed(() => this.touched() && !this.isValid());
  summary = computed(() => {
    const first = this.posts()[0];
    return first ? `${first.District}, ${first.State}` : '';
  });

  onInput(value: string) {
    this.pincode.set(value.replace(/\D/g, '').slice(0, 6));
  }

  search() {
    this.touched.set(true);
    if (!this.isValid()) {
      return;
    }

    const pin = this.pincode();
    this.request?.unsubscribe();
    this.status.set('loading');
    this.searchedPin.set(pin);

    this.request = this.postalService.getPostOffices(pin).subscribe({
      next: (offices) => {
        this.posts.set(offices);
        this.status.set(offices.length ? 'success' : 'empty');
      },
      error: () => {
        this.posts.set([]);
        this.status.set('error');
      },
    });
  }
}
