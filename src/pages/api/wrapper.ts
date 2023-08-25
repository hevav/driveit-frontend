/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum RoleEnum {
  USER = "USER",
  ADMIN = "ADMIN",
}

/** Модель пользователя */
export interface InfoData {
  id: number;
  firstName: string;
  lastName: string;
  token: string;
  role: RoleEnum;
}

/**
 * Ошибка валидации
 * Ошибка сервера. Что-то пошло не так
 */
export type InfoError =
  | {
      /** @default "VALIDATION_ERROR" */
      code?: string;
      /** @default "Произошла ошибка валидации" */
      message?: string;
      errors: {
        code: string;
        message: string;
        path: string;
      }[];
    }
  | {
      /** @default "USER_NOT_EXISTS" */
      code?: string;
      /** @default "Введённые вами логин или пароль неверны" */
      message?: string;
    }
  | {
      /** @default "SERVER_ERROR" */
      code?: string;
      /** @default "На сервере произошла техническая ошибка. Попробуйте позже" */
      message?: string;
    };

/** Остановки и маршурут с расписанием */
export interface StopData {
  name: string;
  routes: string[];
  schedule: {
    id: number;
    time: string;
    routeName: string;
    tripId: number;
    shipName: string;
  }[];
}

/**
 * Ошибка валидации
 * Ошибка сервера. Что-то пошло не так
 */
export type StopError =
  | {
      /** @default "VALIDATION_ERROR" */
      code?: string;
      /** @default "Произошла ошибка валидации" */
      message?: string;
      errors: {
        code: string;
        message: string;
        path: string;
      }[];
    }
  | {
      /** @default "USER_NOT_EXISTS" */
      code?: string;
      /** @default "Введённые вами логин или пароль неверны" */
      message?: string;
    }
  | {
      /** @default "SERVER_ERROR" */
      code?: string;
      /** @default "На сервере произошла техническая ошибка. Попробуйте позже" */
      message?: string;
    };

/** Список остановок */
export interface ListData {
  pageCount: number;
  items: {
    id: string;
    name: string;
    lat: number;
    lon: number;
  }[];
}

/**
 * Ошибка валидации
 * Ошибка сервера. Что-то пошло не так
 */
export type ListError =
  | {
      /** @default "VALIDATION_ERROR" */
      code?: string;
      /** @default "Произошла ошибка валидации" */
      message?: string;
      errors: {
        code: string;
        message: string;
        path: string;
      }[];
    }
  | {
      /** @default "USER_NOT_EXISTS" */
      code?: string;
      /** @default "Введённые вами логин или пароль неверны" */
      message?: string;
    }
  | {
      /** @default "SERVER_ERROR" */
      code?: string;
      /** @default "На сервере произошла техническая ошибка. Попробуйте позже" */
      message?: string;
    };

/** Список кораблеков */
export interface ListResult {
  pageCount: number;
  items: {
    id: number;
    name: string;
  }[];
}

/**
 * Ошибка валидации
 * Ошибка сервера. Что-то пошло не так
 */
export type ListFail =
  | {
      /** @default "VALIDATION_ERROR" */
      code?: string;
      /** @default "Произошла ошибка валидации" */
      message?: string;
      errors: {
        code: string;
        message: string;
        path: string;
      }[];
    }
  | {
      /** @default "USER_NOT_EXISTS" */
      code?: string;
      /** @default "Введённые вами логин или пароль неверны" */
      message?: string;
    }
  | {
      /** @default "SERVER_ERROR" */
      code?: string;
      /** @default "На сервере произошла техническая ошибка. Попробуйте позже" */
      message?: string;
    };

/** Получение корабля и его расписания */
export interface ShipData {
  id: number;
  name: string;
  schedule: {
    id: number;
    time: string;
    stopName: string;
  }[];
}

/**
 * Ошибка валидации
 * Ошибка сервера. Что-то пошло не так
 */
export type ShipError =
  | {
      /** @default "VALIDATION_ERROR" */
      code?: string;
      /** @default "Произошла ошибка валидации" */
      message?: string;
      errors: {
        code: string;
        message: string;
        path: string;
      }[];
    }
  | {
      /** @default "USER_NOT_EXISTS" */
      code?: string;
      /** @default "Введённые вами логин или пароль неверны" */
      message?: string;
    }
  | {
      /** @default "SERVER_ERROR" */
      code?: string;
      /** @default "На сервере произошла техническая ошибка. Попробуйте позже" */
      message?: string;
    };

/** Список маршрутов */
export interface ListOutput {
  pageCount: number;
  items: {
    id: number;
    shortName: string;
    longName: string;
  }[];
}

/**
 * Ошибка валидации
 * Ошибка сервера. Что-то пошло не так
 */
export type ListFails =
  | {
      /** @default "VALIDATION_ERROR" */
      code?: string;
      /** @default "Произошла ошибка валидации" */
      message?: string;
      errors: {
        code: string;
        message: string;
        path: string;
      }[];
    }
  | {
      /** @default "USER_NOT_EXISTS" */
      code?: string;
      /** @default "Введённые вами логин или пароль неверны" */
      message?: string;
    }
  | {
      /** @default "SERVER_ERROR" */
      code?: string;
      /** @default "На сервере произошла техническая ошибка. Попробуйте позже" */
      message?: string;
    };

/** Список остановок маршурута */
export interface RouteData {
  shortName: string;
  longName: string;
  stops: {
    id: string;
    name: string;
    lat: number;
    lon: number;
  }[];
}

/**
 * Ошибка валидации
 * Ошибка сервера. Что-то пошло не так
 */
export type RouteError =
  | {
      /** @default "VALIDATION_ERROR" */
      code?: string;
      /** @default "Произошла ошибка валидации" */
      message?: string;
      errors: {
        code: string;
        message: string;
        path: string;
      }[];
    }
  | {
      /** @default "USER_NOT_EXISTS" */
      code?: string;
      /** @default "Введённые вами логин или пароль неверны" */
      message?: string;
    }
  | {
      /** @default "SERVER_ERROR" */
      code?: string;
      /** @default "На сервере произошла техническая ошибка. Попробуйте позже" */
      message?: string;
    };

export enum RoleEnum1 {
  USER = "USER",
  ADMIN = "ADMIN",
}

/** Модель пользователя */
export interface SignInData {
  id: number;
  firstName: string;
  lastName: string;
  token: string;
  role: RoleEnum1;
}

/**
 * Ошибка валидации
 * Ошибка сервера. Что-то пошло не так
 */
export type SignInError =
  | {
      /** @default "VALIDATION_ERROR" */
      code?: string;
      /** @default "Произошла ошибка валидации" */
      message?: string;
      errors: {
        code: string;
        message: string;
        path: string;
      }[];
    }
  | {
      /** @default "USER_NOT_EXISTS" */
      code?: string;
      /** @default "Введённые вами логин или пароль неверны" */
      message?: string;
    }
  | {
      /** @default "SERVER_ERROR" */
      code?: string;
      /** @default "На сервере произошла техническая ошибка. Попробуйте позже" */
      message?: string;
    };

export enum RoleEnum2 {
  USER = "USER",
  ADMIN = "ADMIN",
}

/** Модель обновлённого пользователя */
export interface UserUpdateData {
  id: number;
  firstName: string;
  lastName: string;
}

/**
 * Ошибка валидации
 * Ошибка сервера. Что-то пошло не так
 */
export type UserUpdateError =
  | {
      /** @default "VALIDATION_ERROR" */
      code?: string;
      /** @default "Произошла ошибка валидации" */
      message?: string;
      errors: {
        code: string;
        message: string;
        path: string;
      }[];
    }
  | {
      /** @default "USER_NOT_EXISTS" */
      code?: string;
      /** @default "Введённые вами логин или пароль неверны" */
      message?: string;
    }
  | {
      /** @default "SERVER_ERROR" */
      code?: string;
      /** @default "На сервере произошла техническая ошибка. Попробуйте позже" */
      message?: string;
    };

/** Сообщение о том что пользователь успешно удалён */
export interface UserDeleteData {
  message: string;
}

/**
 * Ошибка валидации
 * Ошибка сервера. Что-то пошло не так
 */
export type UserDeleteError =
  | {
      /** @default "VALIDATION_ERROR" */
      code?: string;
      /** @default "Произошла ошибка валидации" */
      message?: string;
      errors: {
        code: string;
        message: string;
        path: string;
      }[];
    }
  | {
      /** @default "USER_NOT_EXISTS" */
      code?: string;
      /** @default "Введённые вами логин или пароль неверны" */
      message?: string;
    }
  | {
      /** @default "SERVER_ERROR" */
      code?: string;
      /** @default "На сервере произошла техническая ошибка. Попробуйте позже" */
      message?: string;
    };

export enum RoleEnum3 {
  USER = "USER",
  ADMIN = "ADMIN",
}

/** Модель пользователя */
export interface UserCreateData {
  id: number;
  firstName: string;
  lastName: string;
  role: RoleEnum3;
}

/**
 * Ошибка валидации
 * Ошибка сервера. Что-то пошло не так
 */
export type UserCreateError =
  | {
      /** @default "VALIDATION_ERROR" */
      code?: string;
      /** @default "Произошла ошибка валидации" */
      message?: string;
      errors: {
        code: string;
        message: string;
        path: string;
      }[];
    }
  | {
      /** @default "USER_NOT_EXISTS" */
      code?: string;
      /** @default "Введённые вами логин или пароль неверны" */
      message?: string;
    }
  | {
      /** @default "SERVER_ERROR" */
      code?: string;
      /** @default "На сервере произошла техническая ошибка. Попробуйте позже" */
      message?: string;
    };

export enum RoleEnum4 {
  USER = "USER",
  ADMIN = "ADMIN",
}

/** Модель пользователя */
export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  role: RoleEnum4;
}

/**
 * Ошибка валидации
 * Ошибка сервера. Что-то пошло не так
 */
export type UserError =
  | {
      /** @default "VALIDATION_ERROR" */
      code?: string;
      /** @default "Произошла ошибка валидации" */
      message?: string;
      errors: {
        code: string;
        message: string;
        path: string;
      }[];
    }
  | {
      /** @default "USER_NOT_EXISTS" */
      code?: string;
      /** @default "Введённые вами логин или пароль неверны" */
      message?: string;
    }
  | {
      /** @default "SERVER_ERROR" */
      code?: string;
      /** @default "На сервере произошла техническая ошибка. Попробуйте позже" */
      message?: string;
    };

export enum ItemsRoleEnum {
  USER = "USER",
  ADMIN = "ADMIN",
}

/** Список пользователй */
export interface UserListData {
  pageCount: number;
  items: {
    id: number;
    firstName: string;
    lastName: string;
    role: ItemsRoleEnum;
    login: string;
  }[];
}

/**
 * Ошибка валидации
 * Ошибка сервера. Что-то пошло не так
 */
export type UserListError =
  | {
      /** @default "VALIDATION_ERROR" */
      code?: string;
      /** @default "Произошла ошибка валидации" */
      message?: string;
      errors: {
        code: string;
        message: string;
        path: string;
      }[];
    }
  | {
      /** @default "USER_NOT_EXISTS" */
      code?: string;
      /** @default "Введённые вами логин или пароль неверны" */
      message?: string;
    }
  | {
      /** @default "SERVER_ERROR" */
      code?: string;
      /** @default "На сервере произошла техническая ошибка. Попробуйте позже" */
      message?: string;
    };

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "https://api.noname.to" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title DriveIT backend
 * @version 1.0
 * @baseUrl https://api.noname.to
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  user = {
    /**
 * @description Получение своего профиля
 *
 * @tags user
 * @name Info
 * @request GET:/user/info
 * @secure
 * @response `200` `InfoData` Модель пользователя
 * @response `400` `{
  \** @default "VALIDATION_ERROR" *\
    code?: string,
  \** @default "Произошла ошибка валидации" *\
    message?: string,
    errors: ({
    code: string,
    message: string,
    path: string,

})[],

}` Ошибка валидации
 * @response `401` `{
  \** @default "USER_NOT_EXISTS" *\
    code?: string,
  \** @default "Введённые вами логин или пароль неверны" *\
    message?: string,

}` Default Response
 * @response `500` `{
  \** @default "SERVER_ERROR" *\
    code?: string,
  \** @default "На сервере произошла техническая ошибка. Попробуйте позже" *\
    message?: string,

}` Ошибка сервера. Что-то пошло не так
 */
    info: (params: RequestParams = {}) =>
      this.request<InfoData, InfoError>({
        path: `/user/info`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  stop = {
    /**
 * @description Получение остановки и его маршурута с расписанием
 *
 * @tags stop
 * @name StopDetail
 * @request GET:/stop/{stopId}
 * @secure
 * @response `200` `StopData` Остановки и маршурут с расписанием
 * @response `400` `{
  \** @default "VALIDATION_ERROR" *\
    code?: string,
  \** @default "Произошла ошибка валидации" *\
    message?: string,
    errors: ({
    code: string,
    message: string,
    path: string,

})[],

}` Ошибка валидации
 * @response `401` `{
  \** @default "USER_NOT_EXISTS" *\
    code?: string,
  \** @default "Введённые вами логин или пароль неверны" *\
    message?: string,

}` Default Response
 * @response `500` `{
  \** @default "SERVER_ERROR" *\
    code?: string,
  \** @default "На сервере произошла техническая ошибка. Попробуйте позже" *\
    message?: string,

}` Ошибка сервера. Что-то пошло не так
 */
    stopDetail: (stopId: number, params: RequestParams = {}) =>
      this.request<StopData, StopError>({
        path: `/stop/${stopId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
 * @description Получение списка остановок
 *
 * @tags stop
 * @name ListList
 * @request GET:/stop/list
 * @secure
 * @response `200` `ListData` Список остановок
 * @response `400` `{
  \** @default "VALIDATION_ERROR" *\
    code?: string,
  \** @default "Произошла ошибка валидации" *\
    message?: string,
    errors: ({
    code: string,
    message: string,
    path: string,

})[],

}` Ошибка валидации
 * @response `401` `{
  \** @default "USER_NOT_EXISTS" *\
    code?: string,
  \** @default "Введённые вами логин или пароль неверны" *\
    message?: string,

}` Default Response
 * @response `500` `{
  \** @default "SERVER_ERROR" *\
    code?: string,
  \** @default "На сервере произошла техническая ошибка. Попробуйте позже" *\
    message?: string,

}` Ошибка сервера. Что-то пошло не так
 */
    listList: (
      query?: {
        /** @default "" */
        query?: string;
        /** @default "1" */
        page?: string;
        /** @default "10" */
        pageSize?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListData, ListError>({
        path: `/stop/list`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),
  };
  ship = {
    /**
 * @description Получение списка кораблей
 *
 * @tags ship
 * @name ListList
 * @request GET:/ship/list
 * @secure
 * @response `200` `ListResult` Список кораблеков
 * @response `400` `{
  \** @default "VALIDATION_ERROR" *\
    code?: string,
  \** @default "Произошла ошибка валидации" *\
    message?: string,
    errors: ({
    code: string,
    message: string,
    path: string,

})[],

}` Ошибка валидации
 * @response `401` `{
  \** @default "USER_NOT_EXISTS" *\
    code?: string,
  \** @default "Введённые вами логин или пароль неверны" *\
    message?: string,

}` Default Response
 * @response `500` `{
  \** @default "SERVER_ERROR" *\
    code?: string,
  \** @default "На сервере произошла техническая ошибка. Попробуйте позже" *\
    message?: string,

}` Ошибка сервера. Что-то пошло не так
 */
    listList: (
      query?: {
        /** @default "" */
        query?: string;
        /** @default "1" */
        page?: string;
        /** @default "10" */
        pageSize?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListResult, ListFail>({
        path: `/ship/list`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
 * @description Получение корабля и его расписания
 *
 * @tags ship
 * @name ShipDetail
 * @request GET:/ship/{shipId}
 * @secure
 * @response `200` `ShipData` Получение корабля и его расписания
 * @response `400` `{
  \** @default "VALIDATION_ERROR" *\
    code?: string,
  \** @default "Произошла ошибка валидации" *\
    message?: string,
    errors: ({
    code: string,
    message: string,
    path: string,

})[],

}` Ошибка валидации
 * @response `401` `{
  \** @default "USER_NOT_EXISTS" *\
    code?: string,
  \** @default "Введённые вами логин или пароль неверны" *\
    message?: string,

}` Default Response
 * @response `500` `{
  \** @default "SERVER_ERROR" *\
    code?: string,
  \** @default "На сервере произошла техническая ошибка. Попробуйте позже" *\
    message?: string,

}` Ошибка сервера. Что-то пошло не так
 */
    shipDetail: (shipId: number, params: RequestParams = {}) =>
      this.request<ShipData, ShipError>({
        path: `/ship/${shipId}`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  route = {
    /**
 * @description Получение списка маршурутов
 *
 * @tags route
 * @name ListList
 * @request GET:/route/list
 * @secure
 * @response `200` `ListOutput` Список маршрутов
 * @response `400` `{
  \** @default "VALIDATION_ERROR" *\
    code?: string,
  \** @default "Произошла ошибка валидации" *\
    message?: string,
    errors: ({
    code: string,
    message: string,
    path: string,

})[],

}` Ошибка валидации
 * @response `401` `{
  \** @default "USER_NOT_EXISTS" *\
    code?: string,
  \** @default "Введённые вами логин или пароль неверны" *\
    message?: string,

}` Default Response
 * @response `500` `{
  \** @default "SERVER_ERROR" *\
    code?: string,
  \** @default "На сервере произошла техническая ошибка. Попробуйте позже" *\
    message?: string,

}` Ошибка сервера. Что-то пошло не так
 */
    listList: (
      query?: {
        /** @default "" */
        query?: string;
        /** @default "1" */
        page?: string;
        /** @default "10" */
        pageSize?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ListOutput, ListFails>({
        path: `/route/list`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
 * @description Получение маршурута и его остановок
 *
 * @tags route
 * @name RouteDetail
 * @request GET:/route/{routeId}
 * @secure
 * @response `200` `RouteData` Список остановок маршурута
 * @response `400` `{
  \** @default "VALIDATION_ERROR" *\
    code?: string,
  \** @default "Произошла ошибка валидации" *\
    message?: string,
    errors: ({
    code: string,
    message: string,
    path: string,

})[],

}` Ошибка валидации
 * @response `401` `{
  \** @default "USER_NOT_EXISTS" *\
    code?: string,
  \** @default "Введённые вами логин или пароль неверны" *\
    message?: string,

}` Default Response
 * @response `500` `{
  \** @default "SERVER_ERROR" *\
    code?: string,
  \** @default "На сервере произошла техническая ошибка. Попробуйте позже" *\
    message?: string,

}` Ошибка сервера. Что-то пошло не так
 */
    routeDetail: (routeId: number, params: RequestParams = {}) =>
      this.request<RouteData, RouteError>({
        path: `/route/${routeId}`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  auth = {
    /**
 * @description Авторизация в системе
 *
 * @tags user
 * @name SignIn
 * @request POST:/auth/signIn
 * @response `200` `SignInData` Модель пользователя
 * @response `400` `{
  \** @default "VALIDATION_ERROR" *\
    code?: string,
  \** @default "Произошла ошибка валидации" *\
    message?: string,
    errors: ({
    code: string,
    message: string,
    path: string,

})[],

}` Ошибка валидации
 * @response `401` `{
  \** @default "USER_NOT_EXISTS" *\
    code?: string,
  \** @default "Введённые вами логин или пароль неверны" *\
    message?: string,

}` Default Response
 * @response `500` `{
  \** @default "SERVER_ERROR" *\
    code?: string,
  \** @default "На сервере произошла техническая ошибка. Попробуйте позже" *\
    message?: string,

}` Ошибка сервера. Что-то пошло не так
 */
    signIn: (
      data: {
        login: string;
        /** @minLength 4 */
        password: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<SignInData, SignInError>({
        path: `/auth/signIn`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  admin = {
    /**
 * @description Обновление пользователя администратором
 *
 * @tags admin
 * @name UserUpdateCreate
 * @request POST:/admin/user/update
 * @secure
 * @response `200` `UserUpdateData` Модель обновлённого пользователя
 * @response `400` `{
  \** @default "VALIDATION_ERROR" *\
    code?: string,
  \** @default "Произошла ошибка валидации" *\
    message?: string,
    errors: ({
    code: string,
    message: string,
    path: string,

})[],

}` Ошибка валидации
 * @response `401` `{
  \** @default "USER_NOT_EXISTS" *\
    code?: string,
  \** @default "Введённые вами логин или пароль неверны" *\
    message?: string,

}` Default Response
 * @response `500` `{
  \** @default "SERVER_ERROR" *\
    code?: string,
  \** @default "На сервере произошла техническая ошибка. Попробуйте позже" *\
    message?: string,

}` Ошибка сервера. Что-то пошло не так
 */
    userUpdateCreate: (
      data: {
        id: number;
        firstName?: string;
        lastName?: string;
        password?: string;
        role: RoleEnum2;
      },
      params: RequestParams = {},
    ) =>
      this.request<UserUpdateData, UserUpdateError>({
        path: `/admin/user/update`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
 * @description Удаление пользователя администратором
 *
 * @tags admin
 * @name UserDeleteDelete
 * @request DELETE:/admin/user/{userId}/delete
 * @secure
 * @response `200` `UserDeleteData` Сообщение о том что пользователь успешно удалён
 * @response `400` `{
  \** @default "VALIDATION_ERROR" *\
    code?: string,
  \** @default "Произошла ошибка валидации" *\
    message?: string,
    errors: ({
    code: string,
    message: string,
    path: string,

})[],

}` Ошибка валидации
 * @response `401` `{
  \** @default "USER_NOT_EXISTS" *\
    code?: string,
  \** @default "Введённые вами логин или пароль неверны" *\
    message?: string,

}` Default Response
 * @response `500` `{
  \** @default "SERVER_ERROR" *\
    code?: string,
  \** @default "На сервере произошла техническая ошибка. Попробуйте позже" *\
    message?: string,

}` Ошибка сервера. Что-то пошло не так
 */
    userDeleteDelete: (userId: string, params: RequestParams = {}) =>
      this.request<UserDeleteData, UserDeleteError>({
        path: `/admin/user/${userId}/delete`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
 * @description Создание пользователя администратором
 *
 * @tags admin
 * @name UserCreateCreate
 * @request POST:/admin/user/create
 * @secure
 * @response `200` `UserCreateData` Модель пользователя
 * @response `400` `{
  \** @default "VALIDATION_ERROR" *\
    code?: string,
  \** @default "Произошла ошибка валидации" *\
    message?: string,
    errors: ({
    code: string,
    message: string,
    path: string,

})[],

}` Ошибка валидации
 * @response `401` `{
  \** @default "USER_NOT_EXISTS" *\
    code?: string,
  \** @default "Введённые вами логин или пароль неверны" *\
    message?: string,

}` Default Response
 * @response `500` `{
  \** @default "SERVER_ERROR" *\
    code?: string,
  \** @default "На сервере произошла техническая ошибка. Попробуйте позже" *\
    message?: string,

}` Ошибка сервера. Что-то пошло не так
 */
    userCreateCreate: (
      data: {
        login: string;
        password: string;
        firstName: string;
        lastName: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<UserCreateData, UserCreateError>({
        path: `/admin/user/create`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
 * @description Получение пользователя
 *
 * @tags admin
 * @name UserDetail
 * @request GET:/admin/user/{userId}
 * @secure
 * @response `200` `UserData` Модель пользователя
 * @response `400` `{
  \** @default "VALIDATION_ERROR" *\
    code?: string,
  \** @default "Произошла ошибка валидации" *\
    message?: string,
    errors: ({
    code: string,
    message: string,
    path: string,

})[],

}` Ошибка валидации
 * @response `401` `{
  \** @default "USER_NOT_EXISTS" *\
    code?: string,
  \** @default "Введённые вами логин или пароль неверны" *\
    message?: string,

}` Default Response
 * @response `500` `{
  \** @default "SERVER_ERROR" *\
    code?: string,
  \** @default "На сервере произошла техническая ошибка. Попробуйте позже" *\
    message?: string,

}` Ошибка сервера. Что-то пошло не так
 */
    userDetail: (userId: string, params: RequestParams = {}) =>
      this.request<UserData, UserError>({
        path: `/admin/user/${userId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
 * @description Получение списка пользователей администратором
 *
 * @tags admin
 * @name UserListList
 * @request GET:/admin/user/list
 * @secure
 * @response `200` `UserListData` Список пользователй
 * @response `400` `{
  \** @default "VALIDATION_ERROR" *\
    code?: string,
  \** @default "Произошла ошибка валидации" *\
    message?: string,
    errors: ({
    code: string,
    message: string,
    path: string,

})[],

}` Ошибка валидации
 * @response `401` `{
  \** @default "USER_NOT_EXISTS" *\
    code?: string,
  \** @default "Введённые вами логин или пароль неверны" *\
    message?: string,

}` Default Response
 * @response `500` `{
  \** @default "SERVER_ERROR" *\
    code?: string,
  \** @default "На сервере произошла техническая ошибка. Попробуйте позже" *\
    message?: string,

}` Ошибка сервера. Что-то пошло не так
 */
    userListList: (
      query: {
        /** @default "1" */
        page?: string;
        pageSize: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<UserListData, UserListError>({
        path: `/admin/user/list`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),
  };
}
