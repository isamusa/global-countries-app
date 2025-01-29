import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StorageService } from '../services/storage.service'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  countries: any[] = [];
  filteredCountries: any[] = [];
  searchQuery: string = '';

  constructor(private http: HttpClient, private storageService: StorageService) {}
  isLoading: boolean = false;

  ngOnInit() {
    this.isLoading = true; 
    this.http.get<any[]>('https://restcountries.com/v3.1/all').subscribe({
      next: (data) => {
        console.log('Countries fetched:', data); 
        this.countries = data;
        this.filteredCountries = data;
        this.isLoading = false; 
      },
      error: (error) => {
        console.error('Failed to fetch countries:', error);
        alert('Failed to load countries. Please check your connection and try again.');
        this.isLoading = false;
      },
    });
  }
  
  

  fetchCountries() {
    this.isLoading = true;
    this.http.get<any[]>('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital').subscribe({
      next: (data) => {
        console.log('Countries fetched:', data);
        this.countries = data;
        this.filteredCountries = data;
      },
      error: (error) => {
        console.error('Failed to fetch countries:', error);
        alert('Failed to load countries. Please try again later.');
      },
    });
      }

      applyFilters() {
        const query = this.searchQuery.toLowerCase().trim();
        this.filteredCountries = this.countries.filter((country) =>
          country.name.common.toLowerCase().includes(query) 
        );
      }
      
      toggleFavorite(country: any) {
        let favorites = this.storageService.getItem('favorites') || [];
        const index = favorites.findIndex((fav: any) => fav.name.common === country.name.common);
        
        if (index === -1) {
          favorites.push(country);
        } else {
          favorites.splice(index, 1);
        }
      
        this.storageService.setItem('favorites', favorites);
      }
      
  clearFilters() {
    this.searchQuery = '';
    this.filteredCountries = this.countries;
  }
  
  isFavorite(country: any): boolean {
    const favorites = this.storageService.getItem('favorites') || [];
    return favorites.some((fav: any) => fav.name.common === country.name.common);
  }
  
}
