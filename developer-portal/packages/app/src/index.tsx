import '@backstage/cli/asset-types';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@backstage/ui/css/styles.css';

function ensureRandomUUID() {
	const globalScope = globalThis as {
		crypto?: {
			randomUUID?: () => string;
			getRandomValues?: (array: Uint8Array) => Uint8Array;
		};
	};

	if (!globalScope.crypto || typeof globalScope.crypto.randomUUID === 'function') {
		return;
	}

	if (typeof globalScope.crypto.getRandomValues !== 'function') {
		return;
	}

	const randomUUID = () => {
		const bytes = new Uint8Array(16);
		globalScope.crypto!.getRandomValues!(bytes);

		// UUID v4 (RFC 4122)
		bytes[6] = (bytes[6] & 0x0f) | 0x40;
		bytes[8] = (bytes[8] & 0x3f) | 0x80;

		const hex = Array.from(bytes, byte => byte.toString(16).padStart(2, '0'));

		return [
			hex.slice(0, 4).join(''),
			hex.slice(4, 6).join(''),
			hex.slice(6, 8).join(''),
			hex.slice(8, 10).join(''),
			hex.slice(10, 16).join(''),
		].join('-');
	};

	Object.defineProperty(globalScope.crypto, 'randomUUID', {
		value: randomUUID,
		writable: true,
		configurable: true,
	});
}

ensureRandomUUID();

ReactDOM.createRoot(document.getElementById('root')!).render(App.createRoot());
