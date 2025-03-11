import { describe, expect, it } from 'vitest'
import { core, CoreContext, CoreError } from '../src'

describe('core', () => {
  it('should add return string', async () => {
    expect(await core({})).toBe('[pkg-placeholder] core')
  })
})

describe('context', () => {
  it('should create context instance', async () => {
    const context = new CoreContext({
      configs: [],
    })
    expect(context).toBeInstanceOf(CoreContext)
    expect(context.config).toBeDefined()
    expect(context.config.resolved).toBeDefined()
    expect(context.hooks).toBeDefined()
  })
})

describe('errors', () => {
  it('should create error instance', () => {
    const error = new CoreError('test')
    expect(error).toBeInstanceOf(Error)
  })

  it('should set error message correctly', () => {
    const message = 'test error message'
    const error = new CoreError(message)
    expect(error.message).toBe(message)
  })

  it('should set error name to constructor name', () => {
    const error = new CoreError('test')
    expect(error.name).toBe('CoreError')
  })

  it('should capture stack trace', () => {
    const error = new CoreError('test')
    expect(error.stack).toBeDefined()
  })

  it('should handle missing Error.captureStackTrace', () => {
    const originalCaptureStackTrace = Error.captureStackTrace
    // 模拟 captureStackTrace 不存在的情况
    Error.captureStackTrace = undefined as any

    const error = new CoreError('test')
    expect(error.stack).toBeDefined()

    // 恢复原始的 captureStackTrace
    Error.captureStackTrace = originalCaptureStackTrace
  })
})
