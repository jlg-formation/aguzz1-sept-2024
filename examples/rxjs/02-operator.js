import { interval, Observable } from "rxjs";

const observer = {
  next: (data) => {
    console.log("data: ", data);
  },
  error: (err) => {
    console.log("err: ", err);
  },
  complete: () => {
    console.log("complete");
  },
};

const plus10 = (/** @type {Observable} */ obs) => {
  return new Observable((subscriber) => {
    const subscription = obs.subscribe({
      next: (data) => {
        subscriber.next(data + 10);
      },
      error: (err) => subscriber.error(err),
      complete: () => subscriber.complete(),
    });

    return () => {
      subscription.unsubscribe();
    };
  });
};

const fois2 = (/** @type {Observable} */ obs) => {
  return new Observable((subscriber) => {
    const subscription = obs.subscribe({
      next: (data) => {
        subscriber.next(data * 2);
      },
      error: (err) => subscriber.error(err),
      complete: () => subscriber.complete(),
    });

    return () => {
      subscription.unsubscribe();
    };
  });
};

const obs = interval(1000);
// const obs1 = plus10(fois2(obs));
const obs1 = obs.pipe(fois2, plus10);
obs1.subscribe(observer);
