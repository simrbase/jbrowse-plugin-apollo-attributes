export enum Status {
  New = 'New',
  InProgress = 'In progress',
  ReadyForReview = 'Ready for review',
  Approved = 'Approved',
}

export function isStatus(possibleStatus: string): possibleStatus is Status {
  return Object.values<string>(Status).includes(possibleStatus)
}
