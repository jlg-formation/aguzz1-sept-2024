import { ReplaySubject } from "rxjs";

const replaySubject = new ReplaySubject(3);

const observer = (s) => {
  return {
    next: (data) => {
      console.log(`${s} data: `, data);
    },
    error: (err) => {
      console.log("err: ", err);
    },
    complete: () => {
      console.log("complete");
    },
  };
};

replaySubject.next(12);
replaySubject.next(13);
replaySubject.next(14);
replaySubject.next(15);

const s1 = replaySubject.subscribe(observer("s1"));

replaySubject.next(16);
