export type Data<TData> = { type: 'data'; data: TData }
export type Error<TError> = { type: 'error'; error: TError }

export type Response<TData, TError> = Data<TData> | Error<TError>
