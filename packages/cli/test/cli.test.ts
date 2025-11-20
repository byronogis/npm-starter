import { beforeEach, describe, expect, it, vi } from 'vitest'

const mockHandle = vi.fn(async () => {})
const mockHandleError = vi.fn()
let capturedCommand: any

vi.mock('../src/index', () => ({
  handle: mockHandle,
}))

vi.mock('../src/errors', () => ({
  handleError: mockHandleError,
}))

vi.mock('citty', () => ({
  defineCommand: vi.fn((config) => {
    capturedCommand = config
    return config
  }),
  runMain: vi.fn(),
}))

describe('cli', () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    mockHandle.mockResolvedValue(undefined)
    await vi.importActual('../src/cli')
  })

  it('should convert string pattern to array', async () => {
    await capturedCommand.run({
      args: { patterns: 'src/**/*.ts', cwd: '/test' },
    })

    expect(mockHandle).toHaveBeenCalledWith({
      patterns: ['src/**/*.ts'],
      cwd: '/test',
    })
  })

  it('should keep array patterns as-is', async () => {
    await capturedCommand.run({
      args: { patterns: ['src/**/*.ts', 'lib/**/*.js'], watch: true },
    })

    expect(mockHandle).toHaveBeenCalledWith({
      patterns: ['src/**/*.ts', 'lib/**/*.js'],
      watch: true,
    })
  })

  it('should handle errors from handle function', async () => {
    const testError = new Error('test error')
    mockHandle.mockRejectedValueOnce(testError)

    await capturedCommand.run({ args: { patterns: 'src/**/*.ts' } })
    await new Promise(resolve => setTimeout(resolve, 10))

    expect(mockHandleError).toHaveBeenCalledWith(testError)
  })
})
