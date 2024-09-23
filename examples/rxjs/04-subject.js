import { Subject } from "rxjs";

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

const subject = new Subject();

subject.next(45);

const s1 = subject.subscribe(observer("s1"));
const s2 = subject.subscribe(observer("s2"));
const s3 = subject.subscribe(observer("s3"));
const s4 = subject.subscribe(observer("s4"));

subject.next(67);

s4.unsubscribe();

subject.next(89);

subject.complete();

subject.next(678);
