import { Observable } from "rxjs";

const obs = new Observable((subscriber) => {
  subscriber.next("truc");
  subscriber.next("titi");
  const timer = setTimeout(() => {
    console.log("after 1000ms");
    subscriber.next("tata");
    subscriber.complete();
  }, 1000);

  return () => {
    console.log("housekeeping");
    clearTimeout(timer);
  };
});

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

const subscription = obs.subscribe(observer);
setTimeout(() => {
  subscription.unsubscribe();
}, 500);
