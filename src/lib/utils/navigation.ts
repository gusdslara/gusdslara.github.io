export const navigationEvent = 'portfolio:navigate';

/** Use the original project name so links stay the same in every language. */
export function projectSlug(name: string): string {
	return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
		.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function navigateToSection(section: string, project?: string) {
	const url = new URL(window.location.href);
	url.hash = section;
	if (project) url.searchParams.set('project', project);
	else url.searchParams.delete('project');
	if (url.href !== window.location.href) {
		window.history.pushState(window.history.state, '', url);
		window.dispatchEvent(new Event(navigationEvent));
	}
}
