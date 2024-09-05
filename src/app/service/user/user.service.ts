import { Injectable } from '@angular/core';
import { of, throwError, timer, Observable } from 'rxjs';
import { catchError, delay, retry, switchMap, tap } from 'rxjs/operators';
import { UserDetails } from '../../model/model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users = [
    { id: 1,
       name: 'John Doe', 
       description: 'User 1 Description', 
       profile: 'https://images.pexels.com/photos/7256457/pexels-photo-7256457.jpeg?auto=compress&cs=tinysrgb&w=600' 
    },
    { id: 2, 
      name: 'Jane Smith', 
      description: 'User 2 Description', 
      profile: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=600' 
    },
    { id: 3, 
      name: 'Alice Johnson', 
      description: 'User 3 Description', 
      profile: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=600' 
    },
    { id: 4, 
      name: 'Bob Brown', 
      description: 'User 4 Description', 
      profile: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600' 
    },
    { id: 5, 
      name: 'Charlie Davis', 
      description: 'User 5 Description', 
      profile: 'https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=600' 
    },
  ];

  constructor() {}

  getUsers(): Observable<UserDetails[]> {
    return timer(1000).pipe(
      switchMap(() => {
        const succeed = Math.random() > 0.5;
        return succeed ? of(this.users).pipe(delay(500)) : throwError('Request failed');
      }),
      tap(() => console.log('Request initiated')),
      retry(3),
      tap({
        next: res => console.log('Request succeeded:', res),
        error: err => console.log('Request failed:', err),
      }),
      catchError(error => {
        console.error('Handling error:', error);
        return throwError(error);
      })
    );
  }
}
