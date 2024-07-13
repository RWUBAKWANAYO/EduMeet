export interface IAxiosConfig<Data = any> {
  url: string;
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  params?: Record<string, string>;
  data?: Data;
}
