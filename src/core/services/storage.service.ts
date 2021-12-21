import { addService } from ".";

export class StorageService {
  load(key: string): any | null {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  async save(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  async delete(key: string) {
    localStorage.removeItem(key);
  }
}

addService(StorageService);
