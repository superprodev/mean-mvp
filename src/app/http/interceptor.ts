import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  // Skip if absolute URL
  if (req.url.startsWith('http')) {
    return next(req);
  }

  const apiReq = req.clone({
    url: `http://localhost:8000${req.url}`,
  });

  return next(apiReq);
};
