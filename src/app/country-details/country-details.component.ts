import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-country-details',
  standalone: true,
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css'],
  imports: [CommonModule, RouterModule], 
})
export class CountryDetailsComponent implements OnInit {
  country: any; // Stores country data
  backgroundInfo: string = ''; // Stores country background description
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const countryName = this.route.snapshot.paramMap.get('name'); // Get country name from URL
    if (countryName) {
      this.fetchCountryDetails(countryName);
    }
  }

  fetchCountryDetails(name: string): void {
    this.http.get(`https://restcountries.com/v3.1/name/${name}`).subscribe({
      next: (data: any) => {
        this.country = data[0];
        this.fetchCountryBackground(this.country.name.common);
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Country details not found.';
        this.isLoading = false;
      },
    });
  }

  fetchCountryBackground(countryName: string): void {
    const wikiApiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
      countryName
    )}`;
    this.http.get(wikiApiUrl).subscribe({
      next: (data: any) => {
        this.backgroundInfo = data.extract || 'No background information available.';
      },
      error: () => {
        this.backgroundInfo = 'Could not fetch additional background information.';
      },
    });
  }

  getLanguages(languages: any): string {
    return languages ? Object.values(languages).join(', ') : 'N/A';
  }

  getCurrencies(currencies: any): string {
    return currencies
      ? Object.values(currencies)
          .map((currency: any) => `${currency.name} (${currency.symbol})`)
          .join(', ')
      : 'N/A';
  }

  goBack(): void {
    this.router.navigate(['/']); // Navigate back to home
  }
}
