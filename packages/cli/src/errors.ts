import process from 'node:process'
import { consola } from 'consola'
import { CoreError } from 'pkg-placeholder'

export function handleError(error: unknown): void {
  if (error instanceof CoreError) {
    consola.error(error.message)
  }
  else {
    console.error(error)
  }

  process.exitCode = 1
}
