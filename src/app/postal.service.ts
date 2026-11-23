import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

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

const API_URL = 'https://api.postalpincode.in/pincode';

@Injectable({ providedIn: 'root' })
export class PostalService {
  private http = inject(HttpClient);

  getPostOffices(pincode: string): Observable<PostOffice[]> {
    return this.http
      .get<PincodeResponse[]>(`${API_URL}/${encodeURIComponent(pincode)}`)
      .pipe(map((res) => res[0]?.PostOffice ?? []));
  }
}
