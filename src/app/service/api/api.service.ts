import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { CombinedData, UserDetails, UserPosts } from '../../model/model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor() {}

  private user$: Observable<UserDetails[]> = of([
    {
      id: 1,
      name: 'Alice Johnson',
      description: 'Software Engineer',
      profile: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ]).pipe(delay(500));

  private posts$: Observable<UserPosts[]> = of([
    {
      id: 1,
      title: 'Angular vs React',
      description: 'Comparison of Angular and React',
      image: 'https://miro.medium.com/v2/resize:fit:1400/1*ybY4O0j0Lm5KB7VG2lL92w.png',
    },
    {
      id: 2,
      title: 'Understanding RxJS',
      description: 'Introduction to Reactive Programming',
      image: 'https://miro.medium.com/v2/resize:fit:1080/0*yipZNlMxktpB_0oq.png',
    },
    {
      id: 3,
      title: 'State Management in Angular',
      description: 'Using NgRx for state management',
      image: 'https://miro.medium.com/v2/resize:fit:462/1*TLysH5VeZYPyLpS8yKxljg.png',
    },
    {
      id: 4,
      title: 'CSS Grid vs Flexbox',
      description: 'Choosing the right layout tool',
      image: 'https://verpex.com/assets/uploads/images/blog/modern-layouts.jpg?v=1685715547',
    },
    {
      id: 5,
      title: 'Introduction to TypeScript',
      description: 'Getting started with TypeScript',
      image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ]).pipe(delay(700));

  getUserDetails(): Observable<UserDetails[]> {
    return this.user$;
  }

  getUserPosts(): Observable<UserPosts[]> {
    return this.posts$;
  }

  getCombinedData(): Observable<CombinedData> {
    return combineLatest([this.getUserDetails(), this.getUserPosts()]).pipe(
      map(([userDetails, userPosts]) => ({ userDetails, userPosts }))
    );
  }

  search(term: string): Observable<CombinedData> {
    return this.getCombinedData().pipe(
      map(({ userDetails, userPosts }) => {
        const lowerTerm = term.toLowerCase();

        const filteredUserDetails = userDetails.filter(
          (user) =>
            user.name.toLowerCase().includes(lowerTerm) ||
            user.description.toLowerCase().includes(lowerTerm)
        );

        const filteredUserPosts = userPosts.filter(
          (post) =>
            post.title.toLowerCase().includes(lowerTerm) ||
            post.description.toLowerCase().includes(lowerTerm)
        );

        return { userDetails: filteredUserDetails, userPosts: filteredUserPosts };
      })
    );
  }
}
