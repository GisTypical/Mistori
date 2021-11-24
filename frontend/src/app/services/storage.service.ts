import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  async setItem(key: string, value: string): Promise<void> {
    await Storage.set({ key, value });
  }

  async getItem(key: string): Promise<string> {
    const { value } = await Storage.get({ key });
    return value;
  }

  async removeItem(key: string): Promise<void> {
    await Storage.remove({ key });
  }
}
