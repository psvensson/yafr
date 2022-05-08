# Dispatcher

Is installed on any cloud service (or in a browser window) and can deploy flows

Typically one dispatcher for dev, one for qa, one for prod, et.c. when running server-side

Listens to a controller, which can tell it to deploy flows or update flows or modules form a catalogue to a runner

So it can also be seen as a runner manager.

A dispatcher is configured with a name and the ip address/port of the controller it should connect to

### API

listRunners()

```
[ { id, name, version, startTime, upTime }, ... ]
```

createRunner()

```
{ ipAddress, port }
```

deleteRunner( ipAddress, port )

```
true | false
```

startOrUpdateFlowOnRunner( ipAddress, port, flow )

```
runnerFlowId
```

stopFlowOnRunner( runnerFlowId )

```
true | false
```

sendCommandToRunner( runnerFlowId, runnerCommand )

```
{ runnerReturnValue }
```
