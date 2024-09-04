import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api/api.service';
import { catchError, debounceTime, switchMap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { CombinedData } from '../../model/model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  combinedData!: CombinedData;
  loading = false;
  error: string | null = null;
  searchForm!: FormGroup;
  searchResults: CombinedData | null = null;
  errorMessage: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadInitialData();
    this.handleSearch();
  }

  initializeForm(): void {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  loadInitialData(): void {
    this.loading = true;
    this.apiService.getCombinedData().subscribe({
      next: (data: CombinedData) => {
        this.combinedData = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load data';
        this.loading = false;
      },
    });
  }

  handleSearch(): void {
    this.searchForm.get('searchTerm')?.valueChanges.pipe(
      debounceTime(300),
      switchMap((term) => {
        if (term.trim().length < 3) {
          return of(null);
        }
        this.loading = true;
        return this.apiService.search(term.trim()).pipe(
          catchError((error) => {
            console.error(error);
            this.errorMessage = `Error: ${error.message}`;
            return of(null);
          })
        );
      })
    ).subscribe((results) => {
      this.loading = false;
      if (results) {
        this.searchResults = results;
        if (results.userDetails.length === 0 && results.userPosts.length === 0) {
          this.errorMessage = 'No results found.';
        } else {
          this.errorMessage = null;
        }
      } else {
        this.searchResults = null;
        this.errorMessage = null;
      }
    });
  }
}
