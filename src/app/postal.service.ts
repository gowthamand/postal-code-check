import { Injectable, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';

export interface PostOffice {
  Name: string;
  BranchType: string;
  DeliveryStatus: string;
  District: string;
  Division: string;
  State: string;
  Region: string;
}

export interface PincodeResponse {
  Status: 'Success' | 'Error' | '404';
  Message: string;
  PostOffice: PostOffice[] | null;
}

export const PIN_PATTERN = /^[1-9]\d{5}$/;

const API_URL = 'https://api.postalpincode.in/pincode';

@Injectable({ providedIn: 'root' })
export class PostalService {
  postOffices(pin: Signal<string | undefined>) {
    return httpResource<PostOffice[]>(
      () => {
        const code = pin();
        return code ? `${API_URL}/${encodeURIComponent(code)}` : undefined;
      },
      {
        parse: (raw) => (raw as PincodeResponse[])[0]?.PostOffice ?? [],
        defaultValue: [],
      }
    );
  }
}
