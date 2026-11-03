import type { ContactForm } from '$lib/types';
import { environment } from '$lib/config/environment';

export async function submitContactForm(data: ContactForm): Promise<boolean> {
	try {
		const response = await fetch(`${environment.apiUrl}/contact`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		if (!response.ok) {
			throw new Error('Failed to submit form');
		}

		return true;
	} catch (error) {
		console.error('API Error:', error);
		throw error;
	}
}


export const api = {
	contact: {
		submit: submitContactForm
	}
};

