import { readFile } from 'node:fs/promises'

const registryPath = new URL('../public/r/lifecycle-effects.json', import.meta.url)
const registry = JSON.parse(await readFile(registryPath, 'utf8'))

const expectedTargets = [
  '@hooks/use-initial-effect.ts',
  '@hooks/use-update-effect.ts',
  '@hooks/use-unmount-effect.ts',
  '@hooks/use-render-effect.ts',
  '@hooks/use-cycle-effect.ts',
]

const fail = (message) => {
  console.error(`registry check failed: ${message}`)
  process.exitCode = 1
}

if (registry.name !== 'lifecycle-effects') {
  fail(`expected name "lifecycle-effects", got ${JSON.stringify(registry.name)}`)
}

if (registry.type !== 'registry:hook') {
  fail(`expected type "registry:hook", got ${JSON.stringify(registry.type)}`)
}

for (const field of [
  'dependencies',
  'devDependencies',
  'registryDependencies',
  'commands',
]) {
  const value = registry[field]
  if (Array.isArray(value) && value.length > 0) {
    fail(`expected ${field} to be empty or omitted`)
  }
  if (value && !Array.isArray(value)) {
    fail(`expected ${field} to be an array when present`)
  }
}

const files = registry.files ?? []
const targets = files.map((file) => file.target)

for (const target of expectedTargets) {
  if (!targets.includes(target)) {
    fail(`missing target ${target}`)
  }
}

for (const file of files) {
  if (file.type !== 'registry:hook') {
    fail(`expected ${file.target} to use registry:hook, got ${file.type}`)
  }
  if (typeof file.content !== 'string' || file.content.length === 0) {
    fail(`expected ${file.target} to include inline content`)
  }
}

if (process.exitCode) {
  process.exit()
}

console.log('registry check passed')
