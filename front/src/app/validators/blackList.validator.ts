import { HttpClient } from '@angular/common/http';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { delay, map, Observable, of, switchMap } from 'rxjs';

const blackList = ['zut', 'toto'];

export const blackListAsyncValidator: (
  httpClient: HttpClient
) => AsyncValidatorFn =
  (httpClient: HttpClient) =>
  (
    controls: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return of(undefined).pipe(
      delay(1000),
      map(() => {
        console.log('check');
        if (blackList.includes(controls.value)) {
          return { blackList: 'pas bien' };
        }
        return null;
      })
    );
  };

const sleep = (delay: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, delay);
  });
};

export const blackList2AsyncValidator: AsyncValidatorFn = (
  controls: AbstractControl
): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
  return sleep(1000).then(() => {
    if (controls.value === 'zut') {
      return { blackList: 'pas bien' };
    }
    return null;
  });
};
