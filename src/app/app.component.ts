import { Component, OnInit, OnDestroy } from '@angular/core';
import { of, from, interval, throwError, Subscription } from 'rxjs';
import { take, concat } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {

  numberSubscription!: Subscription;
  colorsSubscription!: Subscription;
  intervalSubscription!: Subscription;
  combinedSubscription!: Subscription;
  errorSubscription!: Subscription;

  ngOnInit() {
    // Creating and Subscribing to an Observable with 'of'
    const numberObservable = of(1, 2, 3, 4, 5);
    this.numberSubscription = numberObservable.subscribe({
      next: value => console.log(' Number:', value),
      complete: () => console.log('Observable completed')
    });

    //  Working with 'from'
    const colorsArray = ['Red', 'Green', 'Blue', 'Yellow', 'Purple'];
    const colorsObservable = from(colorsArray);
    this.colorsSubscription = colorsObservable.subscribe({
      next: color => console.log('Color:', color),
      complete: () => console.log('Observable completed')
    });

    // Using 'interval'
    const intervalObservable = interval(1000).pipe(take(5));
    this.intervalSubscription = intervalObservable.subscribe({
      next: value => console.log('Interval Value:', value, 'Timestamp:', new Date().toLocaleTimeString()),
      complete: () => console.log('Observable completed')
    });

    // Combining Observables
    const combinedObservable = numberObservable.pipe(concat(colorsObservable));
    this.combinedSubscription = combinedObservable.subscribe({
      next: value => console.log('Combined Value:', value),
      complete: () => console.log('Combined Observable completed')
    });

    // Error Handling
    const errorObservable = of(1, 2, 3, 4, 5).pipe(
      concat(throwError('An error occurred!'))
    );
    this.errorSubscription = errorObservable.subscribe({
      next: value => console.log('Value:', value),
      error: err => console.error('Error:', err),
      complete: () => console.log('Observable completed')
    });
  }

  ngOnDestroy() {
    if (this.numberSubscription) {
      this.numberSubscription.unsubscribe();
    }
    if (this.colorsSubscription) {
      this.colorsSubscription.unsubscribe();
    }
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
    if (this.combinedSubscription) {
      this.combinedSubscription.unsubscribe();
    }
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }
  }
}
