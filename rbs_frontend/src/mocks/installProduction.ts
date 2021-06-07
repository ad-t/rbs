import { Production } from 'src/shared/types';

const production: Production = {
  id: 1000,
  title: 'Testing Revue',
  subtitle: 'Demonstration revue',
  year: 9999,
  description: 'This is a revue',
};

export async function installProduction() {
  return new Promise<Production>((resolve) =>
    setTimeout(() => resolve(production), 1000)
  );
}
