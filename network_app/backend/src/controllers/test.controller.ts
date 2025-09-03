import {get} from '@loopback/rest';

export class HelloController {
  @get('/test')
  bye(): string {
    return 'Goodbye world!';
  }
}
