import {
  AuthenticateFn,
  AuthenticationBindings,
  AUTHENTICATION_STRATEGY_NOT_FOUND,
  USER_PROFILE_NOT_FOUND,
} from '@loopback/authentication';
import {
  MiddlewareSequence,
  RequestContext,
  InvokeMiddleware,
  InvokeMiddlewareOptions,
} from '@loopback/rest';
import {inject, Context} from '@loopback/core';

export class MySequence extends MiddlewareSequence {
  constructor(
    @inject.context()
    context: Context,

    @inject('invokeMiddleware')
    invokeMiddleware: InvokeMiddleware,

    @inject(AuthenticationBindings.AUTH_ACTION)
    protected authenticateRequest: AuthenticateFn,

    @inject('rest.invokeMiddlewareOptions', {optional: true})
    options?: InvokeMiddlewareOptions,
  ) {
    super(context, invokeMiddleware, options);
  }

  async handle(context: RequestContext) {
    try {
      const {request} = context;

      // 🔐 JWT authentication
      await this.authenticateRequest(request);

      // Continue with default middleware sequence
      await super.handle(context);
    } catch (err: any) {
      if (
        err.code === AUTHENTICATION_STRATEGY_NOT_FOUND ||
        err.code === USER_PROFILE_NOT_FOUND
      ) {
        err.statusCode = 401;
      }
      throw err;
    }
  }
}
