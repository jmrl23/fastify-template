import { app } from '@/app';
import { init } from '@/init';

async function main() {
  await init();
  await app();
}
void main();
