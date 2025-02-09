import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { JwtService } from "../auth/services/jwt.service";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {    
    const token = inject(JwtService).getToken();

    const apiReq = req.clone({ 
        setHeaders: {
            ...(token ? {Authorization: `Token ${token}`} : {}),
        },
     });
    return next(apiReq);
}