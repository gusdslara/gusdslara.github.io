export const toolIcons: Record<string, string> = {
  Angular: '/assets/img/tools/angular.png',
  TypeScript: '/assets/img/tools/typescript.png',
  'Node.js': '/assets/img/tools/nodejs.png',
  Ionic: '/assets/img/tools/ionic.png',
  Android: '/assets/img/tools/android.png',
  iOS: '/assets/img/tools/apple.svg',
  Cordova: '/assets/img/tools/cordova.png',
  MongoDB: '/assets/img/tools/mongodb.png',
  Stripe: '/assets/img/tools/stripe.png',
  WebRTC: '/assets/img/tools/webrtc.png',
  AWS: '/assets/img/tools/aws.png',
  Flutter: '/assets/img/tools/flutter_logo.svg',
  Dart: '/assets/img/tools/flutter_logo.svg',
  Firebase: '/assets/img/tools/firebase.png',
  Go: '/assets/img/tools/golang.png',
  PostgreSQL: '/assets/img/tools/postgres.png',
  Svelte: '/assets/img/tools/svelte.png',
  'Three.js': '/assets/img/tools/threejs.png',
  Qt: '/assets/img/tools/qt.png',
  TailwindCSS: '/assets/img/tools/tailwind.png',
  WebSocket: '/assets/img/tools/nodejs.png',
  Unity: '/assets/img/tools/unity.png',
  Blender: '/assets/img/tools/blender.png',
  Docker: '/assets/img/tools/docker.png',
  Azure: '/assets/img/tools/azure.png',
  PixiJS: '/assets/img/tools/pixijs.png',
  'Pixi.js': '/assets/img/tools/pixijs.png',
  Redis: '/assets/img/tools/redis.png',
  'Spring Boot': '/assets/img/tools/springboot.png',
  SpringBoot: '/assets/img/tools/springboot.png',
  Quarkus: '/assets/img/tools/quarkus.png',
  Python: '/assets/img/tools/python.svg',
  FastAPI: '/assets/img/tools/fastapi.png',
  Ollama: '/assets/img/tools/ollama.png',
  gRPC: '/assets/img/tools/grpc.png',
  '.NET': '/assets/img/tools/dotnet.svg',
  DotNet: '/assets/img/tools/dotnet.svg',
  NodeJS: '/assets/img/tools/nodejs.png',
  Terraform: '/assets/img/tools/terraform.png',
  'CI/CD': '/assets/img/tools/github.png',
  C: '/assets/img/tools/c.png',
  'C++': '/assets/img/tools/c++.png',
  Lua: '/assets/img/tools/lua.svg',
  'Wear OS': '/assets/img/tools/android.png',
  WearOS: '/assets/img/tools/android.png',
  SDL: '/assets/img/tools/c++.png',
  OpenGL: '/assets/img/tools/android.png',
  Tauri: '/assets/img/tools/tauri.png',
  Rust: '/assets/img/tools/rust.png'
};

export function getToolIcon(tool: string): string | undefined {
  if (!tool) return undefined;


  if (toolIcons[tool]) return toolIcons[tool];


  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/gi, '');
  const normalized = normalize(tool);

  for (const key of Object.keys(toolIcons)) {
    if (normalize(key) === normalized) return toolIcons[key];
  }

  return undefined;
}


const aliasMapping: Record<string, string> = {
  'Three.js': toolIcons['Three.js'] ?? '/assets/img/tools/threejs.png',
  ThreeJS: toolIcons['Three.js'] ?? '/assets/img/tools/threejs.png',
  threejs: toolIcons['Three.js'] ?? '/assets/img/tools/threejs.png',
  pixijs: toolIcons['PixiJS'] ?? '/assets/img/tools/pixijs.png',
  'pixi.js': toolIcons['PixiJS'] ?? '/assets/img/tools/pixijs.png',
  Pixi: toolIcons['PixiJS'] ?? '/assets/img/tools/pixijs.png'
};

Object.assign(toolIcons, aliasMapping);
