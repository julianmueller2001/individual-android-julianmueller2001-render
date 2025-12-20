import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {
  TokenServiceBindings,
  UserRepository,
  UserServiceBindings,
  JWTAuthenticationComponent,
  UserCredentialsRepository, MyUserService, // Add this import
} from '@loopback/authentication-jwt';
import {AuthenticationComponent} from '@loopback/authentication';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import {DbDataSource} from './datasources';

export {ApplicationConfig};

export class BackendApp extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    this.component(AuthenticationComponent);
    this.component(JWTAuthenticationComponent);

// Bind the datasource for the extension
    this.dataSource(DbDataSource, UserServiceBindings.DATASOURCE_NAME);

// FORCE the migration script to see these repositories
    this.repository(UserRepository);
    this.repository(UserCredentialsRepository);

    this.bind(UserServiceBindings.USER_SERVICE).toClass(MyUserService);
  }
}
