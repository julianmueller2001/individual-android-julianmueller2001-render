import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'postgresloopbacktutorial',
  connector: 'postgresql',
  url: 'postgresql://postgresloopbacktutorial_f3kl_user:Hgyt32i3PBRdNGTwpUwsS07fD3NoqPlg@dpg-d52jniumcj7s73bq0ks0-a.frankfurt-postgres.render.com:5432/postgresloopbacktutorial_f3kl?ssl=true',
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class JwtDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'jwtdb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.jwtdb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
