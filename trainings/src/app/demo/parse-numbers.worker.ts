/// <reference lib="webworker" />

addEventListener('message', ({data}) => {
  const response: { [id: string]: string } = {startMsg: `worker can perform CPU-Intense tasks, e.g. Data-Parsing ${data}`};

  response.resultData = `${performComplexTask(data)}`;

  postMessage(response);
  self.close();
});


function performComplexTask(iterations: number): number {
  if (iterations <= 1) {
    return 1;
  }
  return performComplexTask(iterations - 1) + performComplexTask(iterations - 2);
}
