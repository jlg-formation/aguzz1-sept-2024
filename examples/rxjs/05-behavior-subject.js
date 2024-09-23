import { BehaviorSubject } from "rxjs";

const behaviorSubject = new BehaviorSubject(45);

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

const s1 = behaviorSubject.subscribe(observer("s1"));

behaviorSubject.next(67);
