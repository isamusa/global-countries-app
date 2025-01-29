import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  getItem(key: string): any {
    if (this.isLocalStorageAvailable()) {
      return JSON.parse(localStorage.getItem(key) || 'null');
    }
    return null;
  }

  setItem(key: string, value: any): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      console.warn('localStorage is not available');
    }
  }
}