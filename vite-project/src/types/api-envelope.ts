export interface ApiErrorEnvelope {
  success: false;
  error: {
    message: string;
    details?: string;
  };
}
export interface ApiResponseEnvelope<T> {
  success: true;
  data: T;
}
export interface ApiPaginationResponse<T> {
  success: true;
  data: {
    items: T[];
    pagination: {
      page: number;
      pageSize: number;
      total: number;
      totalPages: number;
    };
  };
}
export type ApiEnvelope<T> = ApiResponseEnvelope<T> | ApiErrorEnvelope;
export type ApiPaginationEnvelope<T> =
  | ApiPaginationResponse<T>
  | ApiErrorEnvelope;
