import typeUtils from 'node:util/types'

export function isNodeException(error: unknown): error is NodeJS.ErrnoException {
  return typeUtils.isNativeError(error) && 'code' in error && 'errno' in error
}

export function isMessageError(error: unknown): error is { message: string } {
  return error !== null && typeof error === 'object' && 'message' in error
}
