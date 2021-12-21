export type BooleanFunction = () => boolean;

export type KeyValueFromType<T> = {
  key: keyof T;
  value: T[keyof T];
};
