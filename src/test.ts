// Jest pre-start script
export default async function test() {
  await import('./init');
  process.env.NODE_ENV = 'test';
}
