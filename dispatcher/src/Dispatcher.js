export class Dispatcher {
  listRunners() {}
  createRunner() {}
  deleteRunner(ipAddress, port) {}
  startOrUpdateFlowOnRunner(ipAddress, port, flow) {}
  stopFlowOnRunner(runnerFlowId) {}
  sendCommandToRunner(runnerFlowId, runnerCommand) {}
}
