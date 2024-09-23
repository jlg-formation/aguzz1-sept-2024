import { interval, map, startWith, take } from "rxjs";

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

const obs = interval(1000).pipe(
  startWith(-1),
  map((x) => x + 11),
  take(4)
);

obs.subscribe(observer);
