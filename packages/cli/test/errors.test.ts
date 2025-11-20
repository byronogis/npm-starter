import process from 'node:process'
import { consola } from 'consola'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { handleError, PrettyError } from '../src/errors'

vi.mock('consola')

describe('errors', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.exitCode = 0
  })

  describe('prettyError', () => {
    it('should create error with name and message', () => {
      const error = new PrettyError('test error')

      expect(error).toBeInstanceOf(Error)
      expect(error.name).toBe('PrettyError')
      expect(error.message).toBe('test error')
      expect(error.stack).toContain('test error')
    })

    it('should fallback when captureStackTrace unavailable', () => {
      const original = Error.captureStackTrace
      // @ts-expect-error - testing fallback
      Error.captureStackTrace = undefined

      const error = new PrettyError('fallback test')

      expect(error.stack).toContain('fallback test')
      Error.captureStackTrace = original
    })
  })

  describe('handleError', () => {
    it('should log PrettyError and set exit code', () => {
      const error = new PrettyError('pretty error')

      handleError(error)

      expect(consola.error).toHaveBeenCalledWith('pretty error')
      expect(process.exitCode).toBe(1)
    })

    it('should set exit code for any error', () => {
      handleError(new Error('regular error'))
      expect(process.exitCode).toBe(1)

      process.exitCode = 0
      handleError('string error')
      expect(process.exitCode).toBe(1)
    })
  })
})
