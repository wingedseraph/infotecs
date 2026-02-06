export type Schema<T> = {
  [K in keyof T]: (value: unknown) => value is T[K];
};

export function isObject(data: unknown): data is Record<string, unknown> {
  return typeof data === 'object' && data !== null && !Array.isArray(data);
}

export function hasProperty<K extends string>(
  property: K,
  object: Record<string, unknown>
): object is Record<K, unknown> {
  return property in object;
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isArray<T>(
  value: unknown,
  test: (item: unknown) => item is T
): value is T[] {
  return Array.isArray(value) && value.every(item => test(item));
}

export function validateObject<T>(data: unknown, schema: Schema<T>): data is T {
  if (!isObject(data)) {
    return false;
  }

  for (const key in schema) {
    if (!hasProperty(key, data) || !schema[key](data[key])) {
      return false;
    }
  }

  return true;
}
