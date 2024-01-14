import { CompleteViewProject } from "../types/project";
import { CompleteViewTask } from "../types/task";
import { Numbers, State } from "../types/types.d";

export const numbers = (
  iterator: CompleteViewProject[] | CompleteViewTask[] | null
): Numbers => {
  const num: Numbers = {
    number: 0,
    numberCompleted: 0,
    numberStarted: 0,
  };

  if (!iterator) {
    return num;
  }

  num.number = iterator.length;
  num.numberCompleted = 0;
  num.numberStarted = 0;

  iterator.forEach((element) => {
    if (element.state === State.Developing) num.numberStarted++;
    else if (element.state === State.Finished) num.numberCompleted++;
  });

  // const completed = iterator.filter(
  //   (element: CompleteViewProject | CompleteViewTask) =>
  //     element.state === State.Finished
  // ).length;
  // const started = iterator.filter(
  //   (element: CompleteViewProject | CompleteViewTask) =>
  //     element.state === State.Developing
  // ).length;
  // num.numberCompleted = completed;
  // num.numberStarted = started;

  return num;
};
