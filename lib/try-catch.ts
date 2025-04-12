type Succes<T> = {
  result: T;
  error: null;
};

type Failure<E> = {
  result: null;
  error: E;
};
type Result<T, E = Error> = Succes<T> | Failure<E>;

export default async function tryCatch<T, E = Error>(
  promiseOrFn: Promise<T> | (() => Promise<T>),
): Promise<Result<T, E>> {
  try {
    const promise =
      typeof promiseOrFn === 'function'
        ? (promiseOrFn as () => Promise<T>)()
        : promiseOrFn;
    const result = await promise;
    return { result, error: null };
  } catch (error) {
    return { result: null, error: error as E };
  }
}
