export type Success = { success: true }
export type Failure = { success: false }

export type SimpleResponse = Success | Failure

export const success: SimpleResponse = { success: true }
export const failure: SimpleResponse = { success: false }
