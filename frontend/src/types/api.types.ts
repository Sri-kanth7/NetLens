export type ApiResponse<TData> = {
  success: boolean;
  message: string;
  data: TData;
  meta: Record<string, unknown>;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  errors: string[];
};
