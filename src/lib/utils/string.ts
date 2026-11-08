/**
 * Removes HTML tags from a string and normalizes extra spaces,
 * making it clean for plain text previews (e.g., hover cards, badges, excerpts).
 */
export function stripHtml(html: string | undefined | null): string {
	if (!html) return '';
	return html
		.replace(/<[^>]*>/g, '')
		.replace(/\s+/g, ' ')
		.trim();
}
