// Formata descrições de jobs/educação: negrito automático em tecnologias e
// itens "- " agrupados em listas. Os textos vêm dos locales (confiáveis).

const TERMS = [
	'Python', 'Supabase', 'Go', 'Fiber', 'gRPC', 'OpenAI', 'pgvector', 'Redis', 'GORM',
	'PostgreSQL', 'PostgREST', 'Goose', 'HMAC', 'GitHub Actions', 'Railway', 'LiveKit', 'Yjs',
	'PHP', 'MySQL', 'Angular', 'Angular 4', 'TypeScript', 'Java', 'Java 6', 'Java 11', 'Quarkus',
	'GraalVM', 'Ollama', 'FastAPI', 'RAG', 'ChromaDB', 'LLMs', 'Tool Use', 'C++', 'PlatformIO',
	'ESP32', 'ESP32-CAM', 'Tuya', 'MQTT', 'PWA', 'Svelte', 'Tailwind', 'YOLOv8', 'InfluxDB',
	'Grafana', '.NET', 'Spring Boot', 'Spring Boot WebFlux', 'Spring 3', 'Spring Batch',
	'Terraform', 'AWS', 'EC2', 'JSF', 'JBoss Seam', 'Oracle', 'Flutter', 'MobX', 'jPOS',
	'ISO-8583', 'Kafka', 'Linux Yocto', 'Qt', 'Rust', 'Java Swing', 'Windows/JAM', 'Delphi',
	'Kotlin', 'OpenFeign', 'OCR', 'Tess4J', 'JNI', 'JNA', 'JNI/JNA', 'Ionic 3', 'Cordova',
	'SQLite', 'NgRx', 'Jenkins', 'Fastlane', 'App Store', 'Google Play', 'MongoDB', 'NF-e',
	'JAX-WS', 'XML-DSig', 'ETL', 'Java Web Start', 'JNLP', 'Java EE', 'Servlets', 'JSP',
	'JPA/Hibernate', 'MVC', 'HTML', 'CSS', 'JavaScript', 'SQL', 'RMI', 'EJB', 'SOAP/WSDL',
	'TCP/IP', 'UML', 'ITIL', 'COBIT', 'CI/CD', 'WhatsApp', 'API RESTful', 'RESTful API', 'APIs RESTful', 'RESTful APIs', 'RESTful'
];

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const TERM_RE = new RegExp(
	`(?<![\\p{L}\\d])(${[...TERMS].sort((a, b) => b.length - a.length).map(esc).join('|')})(?![\\p{L}\\d+])`,
	'gu'
);

const escapeHtml = (s: string) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function inline(text: string): string {
	let out = escapeHtml(text).replace(TERM_RE, '<strong>$1</strong>');
	// "**x**" explícito nos textos
	out = out.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
	return out;
}

/** Converte descrição (string ou parágrafos) em HTML com <p> e <ul>. */
export function formatDescription(desc: string | string[]): string {
	const parts = Array.isArray(desc) ? desc : [desc];
	let html = '';
	let list: string[] = [];
	const flush = () => {
		if (list.length) html += `<ul>${list.map((li) => `<li>${li}</li>`).join('')}</ul>`;
		list = [];
	};
	for (const p of parts) {
		if (p.startsWith('- ')) {
			list.push(inline(p.slice(2)));
		} else {
			flush();
			html += `<p>${inline(p)}</p>`;
		}
	}
	flush();
	return html;
}
