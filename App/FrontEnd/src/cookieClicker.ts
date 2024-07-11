export default class LocalStorageAPI {
	// Store JSON data by key
	static setItem(key: string, jsonData: any): void {
		const jsonString = JSON.stringify(jsonData);
		localStorage.setItem(key, jsonString);
	}

	// Retrieve JSON data by key
	static getItem(key: string): any {
		const jsonString = localStorage.getItem(key);
		return jsonString ? JSON.parse(jsonString) : null;
	}

	// Remove data by key
	static removeItem(key: string): void {
		localStorage.removeItem(key);
	}

	// Clear all LocalStorage data
	static clear(): void {
		localStorage.clear();
	}
}
